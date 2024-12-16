class Product {
    public parts: string[] = [];

    public listParts(): void {
        console.log(`Product parts: ${this.parts.join(', ')}`);
    }
}

interface Builder {
    producePartA(): void;
    producePartB(): void;
    producePartC(): void;
}

class ConcreteBuilder implements Builder {
    private product: Product;

    constructor() {
        this.product = new Product();
    }

    public reset(): void {
        this.product = new Product();
    }

    public producePartA(): void {
        this.product.parts.push('PartA');
    }

    public producePartB(): void {
        this.product.parts.push('PartB');
    }

    public producePartC(): void {
        this.product.parts.push('PartC');
    }

    public getProduct(): Product {
        const result = this.product;
        this.reset();
        return result;
    }
}

class Director {
    private builder!: Builder;

    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }

    public buildMinimalViableProduct(): void {
        this.builder.producePartA();
    }

    public buildFullFeaturedProduct(): void {
        this.builder.producePartA();
        this.builder.producePartB();
        this.builder.producePartC();
    }
}

export { Director, ConcreteBuilder, Product };
