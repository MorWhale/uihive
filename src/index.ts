#!/usr/bin/env node
import { Command } from "commander";
import { init } from "./commands/init.js";
import { discover } from "./commands/discover.js";
import { add } from "./commands/add.js";
import { publish } from "./commands/publish.js";
import { list } from "./commands/list.js";
import { info } from "./commands/info.js";
import { serve } from "./commands/serve.js";
import { remove } from "./commands/remove.js";
import { search } from "./commands/search.js";

const isFr = (process.env.UIHIVE_LANG || process.env.LANG || "")
  .toLowerCase()
  .startsWith("fr");
const d = (en: string, fr: string) => (isFr ? fr : en);

const program = new Command();
program
  .name("uihive")
  .description(
    d(
      "Open-source UI component registry compatible with shadcn/ui.",
      "Registry de composants UI open source compatible shadcn/ui.",
    ),
  )
  .version("0.0.1");
program.option(
  "--lang <lang>",
  d("UI language: en or fr", "Langue de la CLI : en ou fr"),
);
program.option(
  "--verbose",
  d("Verbose error output", "Affichage détaillé des erreurs"),
);
program.option(
  "--registry <path>",
  d("Override registry.json path", "Remplacer le chemin de registry.json"),
);
program.hook("preAction", (_thisCmd, actionCmd) => {
  const o = actionCmd.optsWithGlobals();
  if (o.lang) process.env.UIHIVE_LANG = o.lang;
  if (o.verbose) process.env.UIHIVE_VERBOSE = "1";
  if (o.registry) process.env.UIHIVE_REGISTRY = o.registry;
});
program
  .command("init")
  .description(
    d(
      "Configure uihive.json in the target project.",
      "Configurer uihive.json dans le projet cible.",
    ),
  )
  .option(
    "--template <name>",
    d("Template: minimal|team|private", "Template : minimal|team|private"),
  )
  .action(init);
program
  .command("discover")
  .description(
    d(
      "Scan the local network for active registries.",
      "Scanner le réseau local pour trouver les registries actifs.",
    ),
  )
  .action(discover);
program
  .command("add <component>")
  .description(
    d(
      "Copy a shared component and its dependencies.",
      "Copier le composant partagé et ses dépendances.",
    ),
  )
  .option(
    "--dry-run",
    d("Print what would be written without writing", "Afficher sans écrire"),
  )
  .action(add);
program
  .command("publish <file>")
  .description(
    d(
      "Extract and publish a local component.",
      "Extraire et publier un composant local.",
    ),
  )
  .option(
    "--dry-run",
    d("Print what would be published without writing", "Afficher sans écrire"),
  )
  .action(publish);
program
  .command("list")
  .description(
    d("List components in the registry.", "Lister les composants du registry."),
  )
  .action(list);
program
  .command("info <component>")
  .description(
    d(
      "Show details about a component.",
      "Afficher les détails d'un composant.",
    ),
  )
  .action(info);
program
  .command("serve")
  .description(
    d(
      "Advertise the local registry via mDNS.",
      "Annoncer le registry local via mDNS.",
    ),
  )
  .action(serve);
program
  .command("remove <component>")
  .description(
    d(
      "Remove a component from the registry.",
      "Supprimer un composant du registry.",
    ),
  )
  .option(
    "--dry-run",
    d("Print what would be removed without writing", "Afficher sans écrire"),
  )
  .action(remove);
program
  .command("search <query>")
  .description(
    d(
      "Search components by name or dependency.",
      "Rechercher par nom ou dépendance.",
    ),
  )
  .action(search);
program.parse();
