// for switching between days and week 

import React ,{useState}from 'react'
import './switchTabs.scss'

const SwitchTabs = ({data,onTabChange}) => {

//STATE

// this selectTab is used to select Day and week. On selected textcolor is changed to white
const [selectedTab, setSelectedTab] = useState(0);

//this  left is used in css to move orange background(movingBg in css) over days and week 100px to left and right . 
const [left, setLeft] = useState(0);

//METHODS
const activeTab=(tab,index)=>{

    // moving movingBg or orange color background over day and week tab left 100px
    setLeft(index*100);

    // for making animation smooth, we are using setTimeout
    setTimeout(()=>{
        setSelectedTab(index);
    },300);
    
    //  onTabChange is used in trending page
    onTabChange(tab,index);
}
  return (
    <div className="switchingTabs">
    <div className="tabItems">
        {data.map((tab, index) => (
            <span
                key={index}
                className={`tabItem ${
                    selectedTab === index ? "active" : ""
                }`}
                onClick={() => activeTab(tab, index)}
            >
                {tab}
            </span>
        ))}

        <span className="movingBg" style={{ left:left }} />
    </div>
</div>
  )
}

export default SwitchTabs