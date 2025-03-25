import React from 'react'
import skills from "../data/skills.json"

export default function Experience() {

    let assetsUrl = "/assets/";

  return (
    <section id='experience'>
        <h2>Experience</h2>
        <div>
            <div>
                {
                    skills.map((skill, id) => {
                        return (
                        <div key={id}>
                            <div>
                                <img src={`${assetsUrl}${skill.imageSrc}`}/>
                            </div>
                        </div>
                        );
                    })}
            </div>

            <ul></ul>
        </div>
    </section>
  )
}
