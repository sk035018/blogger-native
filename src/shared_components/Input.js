import { Input } from "native-base";

export default (props) => {
    return (
        <Input 
            p={0}
            px={2}
            borderColor='white'
            borderWidth='1'
            {...props}
        />
    );
};