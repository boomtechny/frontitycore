import { TransformOptions } from "@babel/core";
import { Configuration } from "webpack";
export declare type Mode = "development" | "production";
export declare type Target = "module" | "es5" | "server";
export interface BabelConfigs {
    module: TransformOptions;
    es5: TransformOptions;
    server: TransformOptions;
}
export interface WebpackConfigs {
    module: Configuration;
    es5: Configuration;
    server: Configuration;
}
export interface FrontityConfig {
    outDir: string;
}
export interface Config {
    babel: BabelConfigs;
    webpack: WebpackConfigs;
    frontity: FrontityConfig;
}
export interface EntryPoints {
    name: string;
    path: string;
}
export declare type FrontityTags = {
    script?: string;
    link?: string;
    style?: string;
};
export declare type HeadTags = {
    link: string;
    base: string;
    bodyAttributes: string;
    htmlAttributes: string;
    meta: string;
    noscript: string;
    script: string;
    style: string;
    title: string;
};
export declare type Template = ({ html, frontity, head, }: {
    html: string;
    frontity: FrontityTags;
    head: HeadTags;
}) => string;
