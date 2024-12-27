class Singleton {
    private static instance: Singleton;
    private data: string[] = [];

    private constructor() {}

    private static getInstance(): Singleton {
        return Singleton.instance ?? (Singleton.instance = new Singleton());
    }

    public static addData(item: string): void {
        const singleton = Singleton.getInstance();
        singleton.data.push(item);
    }

    public static getData(): string[] {
        return Singleton.getInstance().data;
    }
}

export default Singleton;
