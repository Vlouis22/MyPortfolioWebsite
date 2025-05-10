import React from 'react'
import styles from './Contact.module.css'

import emailIcon from "../../assets/contact/emailIcon.png"
import linkedinIcon from "../../assets/contact/linkedinIcon.png"
import githubIcon from "../../assets/contact/githubIcon.png"

export default function Contact() {
  return (
    <footer id="contact" className={styles.container}>
        <div className={styles.text}>
            <h2>Contact</h2>
            <p>Feel free to reach out!</p>
        </div>
        <ul className={styles.links}>
            <li className={styles.link}>
                <img src={emailIcon} alt="Email icon"></img>
                <a href="mailto:louisvalery2022@gmail.com">louisvalery2022@gmail.com</a>
            </li>

            <li className={styles.link}>
                <img src={linkedinIcon} alt="LinkedIn icon"></img>
                <a href="https://www.linkedin.com/in/valery-louis/">linkedin.com/in/valery-louis</a>
            </li>

            <li className={styles.link}>
                <img src={githubIcon} alt="GitHub icon"></img>
                <a href="https://github.com/Vlouis22">github.com/Vlouis22</a>
            </li>

        </ul>

    </footer>
  )
}
