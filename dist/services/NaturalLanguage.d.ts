export declare class NaturalLanguage {
    private client;
    constructor();
    private analyzeEntities;
    private analyzeSentiment;
    analyzing(document: string): Promise<{
        analyzeSentiment: any;
        analyzeEntities: any;
    }>;
}
