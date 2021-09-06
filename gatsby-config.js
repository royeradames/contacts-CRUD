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
  ],
}
