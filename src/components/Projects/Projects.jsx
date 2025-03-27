import React from 'react'
import projects from "../data/projects.json"
import styles from "./Projects.module.css"


function Project(project){
    return (   
        <a href={project.link} className={styles.link} target='_blank'>         
        <div className={styles.projectContainer}>
            <img src={project.imageSrc} className={styles.projectImage}></img>
            <h3 className={styles.projectHeader}>{project.name}</h3>
            <p className={styles.projectDescription}>{project.description}</p>
        </div>
        </a>   
    )
}


export default function Projects() {
  return (
    <div className={styles.container} id='projects'>
        <h1 className={styles.title}>My Projects</h1>
        <p className={styles.description}>Here are some of my recent projects, each showcasing different skills and expertise. Click on a project to check out the GitHub repository.</p>        <div className={styles.projectsContainer}>
            {projects.map((p, id) => {
                return (
                    Project(p)
                )
            })}
        </div>
    </div>
  )
}
