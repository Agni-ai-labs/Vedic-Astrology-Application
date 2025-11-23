import { BirthChart, PlanetPosition } from '../../types/astrology.types';

export interface ComparisonReport {
    overallScore: number;
    gunaMilan?: GunaMilan;
    doshaCompatibility?: DoshaCompatibility;
    recommendations: string[];
}

export interface GunaMilan {
    scores: { [key: string]: number };
    totalScore: number;
    maxScore: number;
    interpretation: string;
}

export interface DoshaCompatibility {
    mangalDosha: 'compatible' | 'incompatible';
    kaalSarpDosha: 'compatible' | 'incompatible';
    issues: string[];
    notes?: string;
}

export class ComparativeChartAnalyzer {
    // Compare two birth charts for compatibility/synastry
    async compareCharts(
        chart1: BirthChart,
        chart2: BirthChart,
        analysisType: 'compatibility' | 'synastry' | 'composite'
    ): Promise<ComparisonReport> {
        const report: ComparisonReport = {
            overallScore: 0,
            recommendations: []
        };

        if (analysisType === 'compatibility') {
            // Marriage compatibility (Guna Milan)
            report.gunaMilan = await this.calculateGunaMilan(chart1, chart2);

            // Dosha compatibility
            report.doshaCompatibility = await this.checkDoshaCompatibility(chart1, chart2);

            // Overall score
            report.overallScore = this.calculateOverallCompatibility(report);
        }

        // Generate recommendations
        report.recommendations = this.generateCompatibilityRecommendations(report);

        return report;
    }

    private async calculateGunaMilan(chart1: BirthChart, chart2: BirthChart): Promise<GunaMilan> {
        // Mock implementation of Guna Milan
        // In a real system, this would implement the 8 Koota logic
        const scores = {
            varna: 1,
            vashya: 2,
            tara: 3,
            yoni: 4,
            graha: 5,
            gana: 6,
            bhakut: 7,
            nadi: 0 // Nadi dosha often kills the score
        };

        const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

        return {
            scores,
            totalScore,
            maxScore: 36,
            interpretation: this.interpretGunaMilan(totalScore)
        };
    }

    private interpretGunaMilan(score: number): string {
        if (score >= 28) {
            return 'Excellent match - Very compatible';
        } else if (score >= 24) {
            return 'Good match - Compatible';
        } else if (score >= 18) {
            return 'Average match - Some adjustments needed';
        } else {
            return 'Below average - Significant differences to work through';
        }
    }

    private async checkDoshaCompatibility(
        chart1: BirthChart,
        chart2: BirthChart
    ): Promise<DoshaCompatibility> {
        // Mock dosha detection
        const chart1Manglik = Math.random() > 0.7;
        const chart2Manglik = Math.random() > 0.7;

        const compatibility: DoshaCompatibility = {
            mangalDosha: 'compatible',
            kaalSarpDosha: 'compatible',
            issues: []
        };

        if (chart1Manglik && !chart2Manglik) {
            compatibility.mangalDosha = 'incompatible';
            compatibility.issues.push('One person has Mangal Dosha while the other doesn\'t');
        } else if (chart1Manglik && chart2Manglik) {
            compatibility.mangalDosha = 'compatible';
            compatibility.notes = 'Both have Mangal Dosha - cancels out';
        }

        return compatibility;
    }

    private calculateOverallCompatibility(report: ComparisonReport): number {
        let score = 0;
        let weight = 0;

        if (report.gunaMilan) {
            score += (report.gunaMilan.totalScore / report.gunaMilan.maxScore) * 100;
            weight += 1;
        }

        if (report.doshaCompatibility?.mangalDosha === 'incompatible') {
            score *= 0.8; // Penalty for Mangal Dosha mismatch
        }

        return Math.round(score);
    }

    private generateCompatibilityRecommendations(report: ComparisonReport): string[] {
        const recs: string[] = [];

        if (report.overallScore > 70) {
            recs.push('Highly compatible match. Proceed with confidence.');
        } else if (report.overallScore < 50) {
            recs.push('Significant challenges indicated. Consult an astrologer for detailed analysis.');
        }

        if (report.doshaCompatibility?.mangalDosha === 'incompatible') {
            recs.push('Perform Kumbh Vivah or other remedies for Mangal Dosha cancellation.');
        }

        return recs;
    }
}
