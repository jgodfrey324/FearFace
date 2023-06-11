import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import "./about.css"

const AboutMe = () => {
    const user = useSelector(state => state.session.user);


    if (!user) return <Redirect to='/login'></Redirect>



    return (
        <>
        <div className="about-house">


            <div className="person-info">
                <div className="pfp">
                <img className="pfp-img"
                src="https://i.imgur.com/mBsB8To.png"></img>
                </div>
                <div className="bio">
                    <div className="name">Jenna Godfrey</div>
                    <a href="https://github.com/jgodfrey324"><i class="fa-brands fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/jenna-godfrey-6ba51b107/"><i class="fa-brands fa-linkedin"></i></a>
                </div>
            </div>

            <div className="person-info">
            <div className="pfp">
                <img className="pfp-img"
                src="https://i.imgur.com/BXj35BF.jpg"></img>
            </div>
                <div className="bio">
                    <div className="name">Raoul Andalis</div>
                    <a href="https://github.com/raoulandalis"><i class="fa-brands fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/raoul-andalis/"><i class="fa-brands fa-linkedin"></i></a>
                </div>
            </div>

            <div className="person-info">
            <div className="pfp">
                <img className="pfp-img"
                src="https://i.imgur.com/Uq6KjnH.jpg"></img>
            </div>
                <div className="bio">
                    <div className="name">Pierce Henriksbo</div>
                    <a href="https://google.com"><i class="fa-brands fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/pierce-henriksbo"><i class="fa-brands fa-linkedin"></i></a>
                </div>
            </div>

            <div className="person-info">
            <div className="pfp">
                <img className="pfp-img"
                src="https://i.imgur.com/Z4OqyWx.jpg"></img>
            </div>
                <div className="bio">
                <div className="name">Tien Hoang</div>
                    <a href="https://github.com/xuantien93"><i class="fa-brands fa-github"></i></a>
                    {/* <a href="https://google.com"><i class="fa-brands fa-linkedin"></i></a> */}
                </div>
            </div>

        </div>

        <div className="footer">


        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" />


        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" />


        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />


        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" />


        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />



        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" />


        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />



        </div>
        </>
    )
}

export default AboutMe
