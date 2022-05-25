import React from 'react'
import HomeScreen from "./screens/home"
import PopularScreen from "./screens/popular"
import RecommandedScreen from "./screens/recommanded"

export default function App() {
  return (
    <View>
      <HomeScreen /> 
      <PopularScreen />
      <RecommandedScreen />
    </View>
  )

}