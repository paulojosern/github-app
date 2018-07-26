'use strict'

import React, { PropTypes } from 'react'
import style from './actions.css'

const Actions = ({getRepos, getStarred}) => (
    <div className={style.actions}>
        <button onClick={getRepos}>Ver repositórios</button>
        <button onClick={getStarred}>Ver favoritos</button>
    </div>
)
Actions.propTypes = {
    getRepos: PropTypes.func.isRequired,
    getStarred: PropTypes.func.isRequired
}
export default Actions