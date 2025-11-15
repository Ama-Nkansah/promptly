export declare const handleUserTask: (task: string, content: string, value?: number, sectionCount?: number) => Promise<{
    type: string;
    result: string;
} | {
    type: string;
    result: string[];
}>;
