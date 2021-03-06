/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "avb contacts",
    description:
      "A contact application that reads, creates, updates, and deletes contacts. ",
    author: "Royer Adames",
    repo: "https://github.com/royeradames/contacts-CRUD",
    socialLinks: {
      blog: "https://royeraadames.medium.com/",
      github: "https://github.com/royeradames",
      linkedIn: "https://www.linkedin.com/in/royer-adames/",
    },
  },
  /* Your site config here */
  plugins: [
    `gatsby-plugin-sass`,
    // add a loading bar when the page takes more than 1 second to load
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `components`,
        path: `${__dirname}/src/components/`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    // allow dynamic changes of page title and description
    `gatsby-plugin-react-helmet`,
    // allows users to add this site to their home screen on most mobile browsers
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "AVB Contacts",
        short_name: "AVB Conts",
        start_url: "/",
        display: "minimal-ui",
        icon: "./static/favicon-32x32.png",
      },
    },
    // allow offline access
    `gatsby-plugin-offline`,
    // add redux to gatsby
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        // [required] - path to your createStore module
        pathToCreateStoreModule: "./src/state/store",
        // [optional] - if true will clean up after itself on the client, default:
        cleanupOnClient: true,
      },
    },
  ],
}
