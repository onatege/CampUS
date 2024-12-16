import { TouchableOpacity, ActivityIndicator } from "react-native"
import { TextLabel } from "./Texts"

TouchableOpacity
function CustomButton({text, onClick, spinner, backgroundColor}) {
  return (
    <TouchableOpacity onPress={onClick} style={{borderRadius:10, backgroundColor:backgroundColor ? backgroundColor : '#2B2930', justifyContent:'center', alignItems:'center',  height:50, width:'100%', marginTop:16}}>
        {
            spinner ?
            <ActivityIndicator size="small" color="#000000" />
            :
            <TextLabel color={'white'}>{text}</TextLabel>
        }
    </TouchableOpacity>
  )
}

export default CustomButton