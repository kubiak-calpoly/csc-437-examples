export declare function css(template: TemplateStringsArray, ...params: string[]): CssString;

export declare class CssString {
    css: String;
    constructor(s: String);
    toString(): String;
}

export declare interface DefaultParts {
    stylesheets?: string[];
    styles?: CssString[];
    scripts?: string[];
    googleFontURL?: string;
    imports?: object;
}

export declare function html(template: TemplateStringsArray, ...params: Array<string | number | HtmlString | HtmlString[] | CssString | undefined | null | boolean>): HtmlString;

export declare class HtmlString {
    html: String;
    constructor(s: String);
    toString(): String;
}

export declare interface PageParts extends DefaultParts {
    body: HtmlString;
}

export declare function renderWithDefaults(unique: PageParts, defaults: DefaultParts): string;

export { }
