import { Remedy, RemedyPlan, ScoredRemedy, UserContext, UserPreferences } from '@/types/ai.types';
import { Prediction } from '@/types/astrology.types';

export class IntelligentRemedyRecommender {
    // Generate personalized remedy plan
    async generateRemedyPlan(
        userId: string,
        predictions: Prediction[],
        userContext: UserContext,
        preferences: UserPreferences
    ): Promise<RemedyPlan> {

        // Collect all recommended remedies
        const allRemedies: Remedy[] = [];
        predictions.forEach(pred => {
            if (pred.remedies) {
                allRemedies.push(...pred.remedies);
            }
        });

        // Score and rank remedies
        const scoredRemedies = await this.scoreRemedies(
            allRemedies,
            userContext,
            preferences
        );

        // Build comprehensive plan
        const plan: RemedyPlan = {
            daily: [],
            weekly: [],
            monthly: [],
            oneTime: [],
            emergency: []
        };

        // Categorize by frequency
        scoredRemedies.forEach(remedy => {
            const frequency = this.determineFrequency(remedy);

            if (frequency === 'daily') {
                plan.daily.push(remedy);
            } else if (frequency === 'weekly') {
                plan.weekly.push(remedy);
            } else if (frequency === 'monthly') {
                plan.monthly.push(remedy);
            } else if (frequency === 'oneTime') {
                plan.oneTime.push(remedy);
            } else if (frequency === 'emergency') {
                plan.emergency.push(remedy);
            }
        });

        // Optimize plan (avoid conflicts, ensure feasibility)
        const optimizedPlan = this.optimizePlan(plan, preferences);

        // Generate instructions and schedule
        return this.addInstructions(optimizedPlan, userContext);
    }

    private async scoreRemedies(
        remedies: Remedy[],
        context: UserContext,
        preferences: UserPreferences
    ): Promise<ScoredRemedy[]> {
        const scored: ScoredRemedy[] = [];

        for (const remedy of remedies) {
            let score = remedy.effectiveness; // Base score from KB

            // Adjust for user preferences
            score *= this.getPreferenceMultiplier(remedy, preferences);

            // Adjust for feasibility
            score *= this.getFeasibilityScore(remedy, context);

            // Adjust for urgency
            score *= this.getUrgencyMultiplier(remedy, context);

            scored.push({
                remedy,
                score,
                reasoning: this.generateRemedyReasoning(remedy, score, context)
            });
        }

        return scored.sort((a, b) => b.score - a.score);
    }

    private getPreferenceMultiplier(remedy: Remedy, preferences: UserPreferences): number {
        let multiplier = 1.0;

        // Religious/spiritual preferences
        if (remedy.type === 'Mantra' && !preferences.comfortableWithMantras) {
            multiplier *= 0.5;
        }

        if (remedy.type === 'Puja' && !preferences.comfortableWithPujas) {
            multiplier *= 0.3;
        }

        // Budget constraints
        if (remedy.cost === 'High' && preferences.budgetLevel === 'Low') {
            multiplier *= 0.2;
        } else if (remedy.cost === 'Medium' && preferences.budgetLevel === 'Low') {
            multiplier *= 0.6;
        }

        // Time availability
        if (remedy.duration.includes('daily') && preferences.timeAvailability === 'Low') {
            multiplier *= 0.7;
        }

        return multiplier;
    }

    private getFeasibilityScore(remedy: Remedy, context: UserContext): number {
        let score = 1.0;

        // Location-based feasibility
        if (remedy.type === 'Puja' && !context.hasAccessToTemples) {
            score *= 0.5;
        }

        // Time of day constraints
        if (remedy.timing.includes('morning') && context.workSchedule === 'night-shift') {
            score *= 0.6;
        }

        // Physical ability
        if (remedy.type === 'Lifestyle' && remedy.details.includes('yoga') && context.physicalLimitations) {
            score *= 0.7;
        }

        return score;
    }

    private getUrgencyMultiplier(remedy: Remedy, context: UserContext): number {
        // Higher multiplier for remedies addressing urgent issues
        if (context.urgentIssues.length > 0) {
            const addressesUrgentIssue = context.urgentIssues.some(issue =>
                remedy.details.toLowerCase().includes(issue.toLowerCase())
            );

            if (addressesUrgentIssue) {
                return 1.5;
            }
        }

        return 1.0;
    }

    private optimizePlan(plan: RemedyPlan, preferences: UserPreferences): RemedyPlan {
        // Limit daily remedies to avoid overwhelming user
        const maxDailyRemedies = preferences.commitmentLevel === 'High' ? 5 : 3;
        plan.daily = plan.daily.slice(0, maxDailyRemedies);

        // Ensure variety in remedy types
        plan.daily = this.ensureVariety(plan.daily);

        return plan;
    }

    private ensureVariety(remedies: ScoredRemedy[]): ScoredRemedy[] {
        const types = new Set<string>();
        const varied: ScoredRemedy[] = [];

        for (const remedy of remedies) {
            if (!types.has(remedy.remedy.type) || varied.length < 3) {
                varied.push(remedy);
                types.add(remedy.remedy.type);
            }
        }

        // Fill remaining slots if needed
        if (varied.length < remedies.length) {
            for (const remedy of remedies) {
                if (!varied.includes(remedy) && varied.length < 5) {
                    varied.push(remedy);
                }
            }
        }

        return varied;
    }

    private addInstructions(plan: RemedyPlan, context: UserContext): RemedyPlan {
        // Add detailed instructions for each remedy category
        const addDetailedInstructions = (remedies: ScoredRemedy[]) => {
            return remedies.map(r => ({
                ...r,
                instructions: this.generateDetailedInstructions(r.remedy, context),
                trackingMethod: this.suggestTrackingMethod(r.remedy)
            }));
        };

        return {
            daily: addDetailedInstructions(plan.daily),
            weekly: addDetailedInstructions(plan.weekly),
            monthly: addDetailedInstructions(plan.monthly),
            oneTime: addDetailedInstructions(plan.oneTime),
            emergency: addDetailedInstructions(plan.emergency)
        };
    }

    private generateDetailedInstructions(remedy: Remedy, context: UserContext): string {
        let instructions = `**${remedy.details}**\n\n`;

        instructions += `**When to perform**: ${remedy.timing}\n`;
        instructions += `**Duration**: ${remedy.duration}\n\n`;

        if (remedy.type === 'Mantra') {
            instructions += `**How to chant**:\n`;
            instructions += `1. Sit in a quiet, clean place facing east\n`;
            instructions += `2. Light a lamp or incense (optional)\n`;
            instructions += `3. Use a mala (prayer beads) to count repetitions\n`;
            instructions += `4. Chant with focus and devotion\n`;
            instructions += `5. Maintain regularity for best results\n\n`;
        }

        // Add precautions if any
        if (remedy.precautions && remedy.precautions.length > 0) {
            instructions += `**Precautions**:\n`;
            remedy.precautions.forEach(precaution => {
                instructions += `- ${precaution}\n`;
            });
        }

        return instructions;
    }

    private generateRemedyReasoning(remedy: Remedy, score: number, context: UserContext): string {
        let reasoning = `This remedy scores ${score.toFixed(1)}/10 for you because: `;

        const reasons: string[] = [];

        if (remedy.effectiveness > 7) {
            reasons.push('high traditional effectiveness');
        }

        if (remedy.cost === 'Free' || remedy.cost === 'Low') {
            reasons.push('affordable');
        }

        if (context.urgentIssues.some(issue => remedy.details.toLowerCase().includes(issue.toLowerCase()))) {
            reasons.push('addresses your urgent concerns');
        }

        reasoning += reasons.join(', ') + '.';

        return reasoning;
    }

    private determineFrequency(remedy: ScoredRemedy): string {
        const details = remedy.remedy.details.toLowerCase();
        const duration = remedy.remedy.duration.toLowerCase();

        if (duration.includes('daily') || details.includes('every day')) {
            return 'daily';
        }

        if (duration.includes('weekly') || details.includes('thursday') || details.includes('tuesday')) {
            return 'weekly';
        }

        if (duration.includes('monthly') || details.includes('purnima') || details.includes('amavasya')) {
            return 'monthly';
        }

        if (details.includes('once') || remedy.remedy.type === 'Puja') {
            return 'oneTime';
        }

        if (remedy.remedy.type === 'Emergency') {
            return 'emergency';
        }

        return 'weekly'; // Default
    }

    private suggestTrackingMethod(remedy: Remedy): string {
        if (remedy.type === 'Mantra') {
            return 'Use a counter app or mala beads to track daily repetitions';
        }

        if (remedy.type === 'Charity') {
            return 'Keep a donation log with dates and amounts';
        }

        if (remedy.type === 'Fast') {
            return 'Mark fasting days on a calendar';
        }

        return 'Use the app to check off when completed';
    }
}
