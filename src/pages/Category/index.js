import React from "react";
import { Actions } from "react-native-router-flux";
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import TULogo from "../../Images/Logo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Bg from "../../Images/bg.jpg";
const { width } = Dimensions.get("window");

const categories = [
    { text: 'Sport1' },
    { text: 'Sport2' },
    { text: 'Sport3' },
    { text: 'Sport4' },
    { text: 'Sport5' },
    { text: 'Sport6' },
    { text: 'Sport7' },
    { text: 'Sport8' },
    { text: 'Sport9' },
    { text: 'Sport10' },
    { text: 'Sport11' },
    { text: 'Sport12' },
]

class Category extends React.Component {
    state = {
        category: [],

    }

    componentDidMount() {
        this.getCategories()
    }


    setCategoriesWithSelect(data) {
        return data.map((d) => {
            return {
                ...d,
                isSelect: false,
            };
        });
    }    


    getCategories() {
        fetch('http://172.25.79.95:8000/api/category')
            .then((response) => response.json())
            .then((data) => {
                console.log('get categories', data)
                this.setState({ category: this.setCategoriesWithSelect(data) });
                console.log(this.props.userid)
            })
            .catch((error) => {
                console.error(error);
                alert("Fail")
            });
    }

    firstcategory(){
        
    }


    toggleSelect(index) {
        let newCate = [...this.state.category];
        // let newCate = this.state.category;


        newCate[index] = {
            ...newCate[index],
            isSelect: !newCate[index].isSelect
        };

        this.setState({
            category: newCate,
        });
    }

    render() {

        return (
            <ScrollView style={{ flexDirection: 'column', backgroundColor: "white", flex: 1 }}>
                <View>

                    {this.state.category.map((c, index) => (
                        <View style={{ paddingVertical: 10 }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: (c.isSelect) ? 'green' : 'red',
                                    padding: 15,
                                    borderRadius: 15,
                                    alignItems: "center"
                                }}
                                onPress={() => {
                                    this.toggleSelect(index)
                                }}
                            >
                                <Text style={{ color: "white", fontSize: 20 }}>
                                    {c.categoryname}
                                </Text>
                            </TouchableOpacity>

                        </View>

                    ))}


                    <View style={{ paddingVertical: 10 }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#ae5945",
                                padding: 15,
                                borderRadius: 15,
                                alignItems: "center"
                            }}
                            onPress={() => {
                                //   String a = "test1";
                                //   String b = "test b";
                                //   System.out.print('a is:' + a);
                                // alert(this.state.username)
                                // this.login()

                                this.firstcategory()
                            }}
                        >
                            <Text style={{ color: "white", fontSize: 20 }}>
                                OK
                             </Text>
                        </TouchableOpacity>
                    </View>



                </View>
            </ScrollView>
        );
    }
}

export default Category;
