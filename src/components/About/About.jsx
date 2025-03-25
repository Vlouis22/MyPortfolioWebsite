import React from 'react'
import aboutImage from "../../assets/about/aboutImage.png"
import cursorIcon from "../../assets/about/cursorIcon.png"
import serverIcon from "../../assets/about/serverIcon.png"
import styles from "./About.module.css"


export default function () {
  return (
    <section className={styles.container} id="about">
        <h2 className={styles.title}>About</h2>
        <div className={styles.content}>
            <img 
                src={aboutImage} 
                alt='me sitting with a laptop'
                className={styles.aboutImage}
            />
            <ul className={styles.aboutItems}> 
                <li className={styles.aboutItem}>
                    <img src={cursorIcon} alt='Cursor Icon'/>
                    <div className={styles.aboutItemText}>
                        <h3>Mobile Application Developer</h3>
                        <p>I was an intern at Microsoft in the Android Authenticator App team and primarily wrote code in Kotlin.</p>
                    </div>
                </li>
                <li className={styles.aboutItem}>
                    <img src={serverIcon} alt='Server Icon'/>
                    <div className={styles.aboutItemText}>
                        <h3>Web Developer</h3>
                        <p>I have extensive experience in web development, having built websites for hackathons, school projects, and my church.</p>                    </div>
                </li>
                <li className={styles.aboutItem}>
                    <img src={serverIcon} alt='UI Icon'/>
                    <div className={styles.aboutItemText}>
                        <h3>Database Developer</h3>
                        <p>I design and develop efficient, scalable databases to support web and mobile applications.</p>                    </div>
                </li>
            </ul>
        </div>
    </section>
  )
}
