import React , {useEffect} from 'react'
import {List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, IconButton, Checkbox} from '@material-ui/core';

const GeneralCasesRightSide = ({
    generalCases, handleToggle, allowedGeneralCasesChartKeys, 
    allowedGeneralCasesKeys, checked
}) => {

    return(
        <List>
            {allowedGeneralCasesKeys.map((value) => {
                const labelId = `checkbox-list-label-${value.id}`;

                return (
                    <ListItem key={value.id} role={undefined} dense button={allowedGeneralCasesChartKeys.includes(value.id)} onClick={allowedGeneralCasesChartKeys.includes(value.id) ? handleToggle(value.id) : ''}>
                        <ListItemIcon>
                            {
                                allowedGeneralCasesChartKeys.includes(value.id) ? (
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(value.id) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                ) : ''
                            }
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value.name} />
                        <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments">
                            {value.format ? value.format(generalCases[value.id]) : generalCases[value.id]}
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    )
}

export default GeneralCasesRightSide;