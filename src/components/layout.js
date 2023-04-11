import React, {useState} from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql, Link } from "gatsby";

const navItems = [
    {name: "Study 1", link: "/study1"},
    {name: "Study 2", link: "/study2"},
    {name: "Study 3", link: "/study3"},
]

const Layout = (props) => {

        const data = useStaticQuery(graphql`
          {
            logo: file(
              absolutePath: { regex: "/images/.*icon.*/" }
              extension: { eq: "png" }
            ) {
              id
              publicURL
              childImageSharp {
                gatsbyImageData(layout: FIXED, height: 30)
              }
            }
          }
        `);

    const [showMobileMenu,setShowMobileMenu] = useState(false);

    const navBar = (
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/">
            <GatsbyImage
              alt="C4DM logo"
              className="logo"
              image={data.logo.childImageSharp.gatsbyImageData}
            />
          </Link>
          <a
            role="button"
            className={`navbar-burger ${
              showMobileMenu ? "is-active" : undefined
            }`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          className={`navbar-end ${
            !showMobileMenu ? "is-hidden-touch" : undefined
          }`}
        >
          {navItems.map((item) => (
              <Link className="navbar-item" to={item.link} key={`navbar-unit-${item.name}`}>
                {item.name}
              </Link>
          ))}
        </div>
      </nav>
    );
    return (
      <>
        {navBar}
        <main className="container">{props.children}</main>
      </>
    );
}

export default Layout