'use client'

import Tabs from '@/components/Tabs'
import { useState } from 'react'
import HomePageProjectList from './ProjectList'

export default function HomePageProjectTabs() {
  const projects = [
    {
      id: '1',
      name: 'Project 1',
      description: 'Project 1 description'
    },
    {
      id: '2',
      name: 'Project 2',
      description: 'Project 2 description'
    }
  ]

  const [current, setCurrent] = useState(1)
  const tabs = [
    { label: 'Minting', value: 1, quantity: projects.length },
    { label: 'Upcoming', value: 2, quantity: projects.length },
    { label: 'Ended', value: 3, quantity: projects.length }
  ]

  return (
    <div className="desktop:mt-10">
      <Tabs current={current} tabs={tabs} onChangeTab={setCurrent} />

      {current === 1 && <HomePageProjectList projects={projects} />}
      {current === 2 && <HomePageProjectList projects={projects} />}
      {current === 3 && <HomePageProjectList projects={projects} />}
    </div>
  )
}