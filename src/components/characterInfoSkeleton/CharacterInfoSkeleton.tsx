import React from 'react'
import {Skeleton} from "@mui/material"
import s from './CharacterInfoSkeleton.module.css'

export const CharacterInfoSkeleton = () => {
  return (
    <section className={s.mainContainer}>
      <div className={s.characterMainBlock}>
        <Skeleton width={180} height={30} />
        <div className={s.imgBlock}>
          <Skeleton variant={'circular'} width={100} height={100}/>
        </div>
        <Skeleton width={160} height={30}/>
        <div className={s.buttonBlock}>
          <Skeleton width={190} height={60}/>
        </div>
      </div>
    </section>
  )
}