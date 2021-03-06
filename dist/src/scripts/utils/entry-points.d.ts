import { Site } from "@frontity/file-settings";
import { EntryPoints, Mode } from "../../../types";
declare type Type = "client" | "server" | "inline";
export declare const entryPoint: ({ name, mode, type, }: {
    name: string;
    mode: string;
    type: Type;
}) => Promise<string>;
export declare const checkForPackages: ({ sites }: {
    sites: Site[];
}) => Promise<void>;
export declare const generateServerEntryPoint: ({ sites, outDir, }: {
    sites: Site[];
    outDir: string;
}) => Promise<EntryPoints>;
export declare const generateClientEntryPoints: ({ sites, outDir, mode, }: {
    sites: Site[];
    outDir: string;
    mode: Mode;
}) => Promise<EntryPoints[]>;
declare const _default: ({ sites, outDir, mode, }: {
    sites: Site[];
    outDir: string;
    mode: Mode;
}) => Promise<EntryPoints[]>;
export default _default;
