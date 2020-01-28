import * as React from 'react';
import Typography from "@material-ui/core/Typography";
import { LinearInput } from "../commons/inputs";
import { AccountOverviewInterface } from "../interfaces/profile";

function AccountOverview({styleClass, themeStyleClass}: AccountOverviewInterface){
    return (
        <div className={`${styleClass}__incontent`}>
         <Typography gutterBottom variant="h2" component="h3">
            Account overview
          </Typography>
         <div style={{backgroundColor:'white', padding: '5%'}}>
              <Typography gutterBottom variant="h5" component="h2">
                Profile
              </Typography>

             <div className={themeStyleClass.root}>
                 <LinearInput label={'Email'} value={'odurjoseph8@gmail.com'} disabled/>
                 <LinearInput label={'Email'} value={'odurjoseph8@gmail.com'} disabled/>
                 <LinearInput label={'Email'} value={'odurjoseph8@gmail.com'} disabled/>
                 <LinearInput label={'Email'} value={'odurjoseph8@gmail.com'} disabled/>
                 <LinearInput label={'Email'} value={'odurjoseph8@gmail.com'} disabled/>
                 <LinearInput label={'Email'} value={'odurjoseph8@gmail.com'} disabled/>
                 <LinearInput label={'Email'} value={'odurjoseph8@gmail.com'} disabled/>

            </div>
        </div>
     </div>
    )
}

export { AccountOverview }
