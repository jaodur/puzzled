import * as React from "react";
import { footerInterface } from '../interfaces'


function Footer({ footerClass }: footerInterface) {
    return (
        <div className= {footerClass}>
            <div className={`${footerClass}__email`}>
                <h3 className={`${footerClass}__email_title`}>Want us to email you occasionally with Puzzle updates?</h3>
                <input className={`${footerClass}__email_input`} type="text" name="email" placeholder="Enter your email address"/>
                <button className={`${footerClass}__email_submit`}>subscribe</button>
            </div>
            <div className={`${footerClass}__content`}>
                <div className={`${footerClass}__content_about`}></div>
                <div className={`${footerClass}__content_games`}></div>
                <div className={`${footerClass}__content_leaderboard`}></div>
                <div className={`${footerClass}__content_extras`}></div>
            </div>
        </div>
    )
}

export { Footer }
