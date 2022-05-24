import React from "react";
import {
  FooterContainer,
  FooterIcon,
  VersionLabel,
  FooterText,
  FooterSeparator,
  FooterLink,
  FooterReactLink,
} from "./Footer.elements.js";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterIcon />
      <FooterText>Audsio</FooterText>
      <FooterSeparator>·</FooterSeparator>
      <FooterReactLink to="about">About</FooterReactLink>
      <FooterSeparator>·</FooterSeparator>
      <FooterLink
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.patreon.com/audsio"
      >
        Donate
      </FooterLink>
      <FooterSeparator>·</FooterSeparator>
      <VersionLabel>v3.3.2</VersionLabel>
    </FooterContainer>
  );
};

export default Footer;
