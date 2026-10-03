#!/usr/bin/env node
import { Command } from "commander";
import { init } from "./commands/init.js";
import { discover } from "./commands/discover.js";
import { add } from "./commands/add.js";
import { publish } from "./commands/publish.js";

const program = new Command();
program.name("uihive").description("Open-source UI component registry compatible with shadcn/ui.").version("0.0.1");
program.command("init").description("Configure uihive.json in the target project.").action(init);
program.command("discover").description("Scan the local network for active registries.").action(discover);
program.command("add <component>").description("Copy a shared component and its dependencies.").action(add);
program.command("publish <file>").description("Extract and publish a local component.").action(publish);
program.parse();
