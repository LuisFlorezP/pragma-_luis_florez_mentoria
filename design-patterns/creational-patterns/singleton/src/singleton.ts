class Singleton {
    private static instance: Singleton;
    private data: string[] = [];

    private constructor() {}

    public static getInstance(): Singleton {
        return Singleton.instance ?? (Singleton.instance = new Singleton());
    }

    public addData(item: string): void {
        this.data.push(item);
    }

    public getData(): string[] {
        return this.data;
    }
}

export default Singleton;
