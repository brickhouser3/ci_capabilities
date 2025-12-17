import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Mission Control",
  tagline: "Executive Performance Intelligence",
  favicon: "img/mbmc_favicon.png",

  /* ===============================
     🔑 GLOBAL USER INJECTION
     (Docusaurus-safe)
     =============================== */
  headTags: [
    {
      tagName: "script",
      attributes: {},
      innerHTML: `
        window.APP_USER = {
          firstName: "Cody"
        };
      `,
    },
  ],

  future: {
    v4: true,
  },

  url: "https://brickhouser3.github.io",
  baseUrl: "/ci_capabilities/",

  organizationName: "brickhouser3",
  projectName: "ci_capabilities",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",

    colorMode: {
      respectPrefersColorScheme: true,
      defaultMode: "light",
      disableSwitch: true,
    },

    /* ===============================
       🚫 NAVBAR REMOVED COMPLETELY
       =============================== */
    navbar: {
      items: [],
    },

    /* ===============================
       🚫 FOOTER DISABLED (VALID)
       =============================== */
    footer: {
      style: "dark",
      links: [],
      // Must not be empty per Docusaurus validation
      copyright: " ",
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
