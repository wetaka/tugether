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

const firstname = "Piyawadee"
const lastname = "Ekkukkararungroj"
const major = "Computer Science"
const department = "Science and Technology"
const nation = "Thai"
const title = "Miss"
const year = "4"
const age = 21
const active = true

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
        return new Promise((resolve, reject) => {
            return fetch('http://172.25.79.95:8000/api/category')
                .then((response) => response.json())
                .then((data) => {
                    console.log('get categories', data)
                    this.setState(
                        { category: this.setCategoriesWithSelect(data) },
                        () => { resolve(); }
                    );
                    console.log(this.props.userid)
                })
                .catch((error) => {
                    console.error(error);
                    alert("Fail");
                    reject();
                });
        });
    }

    addUser() {
        return new Promise((resolve, reject) => {
            return fetch('http://172.25.79.95:8000/api/user', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: "" + this.props.userid,
                    firstname: "" + firstname,
                    lastname: "" + lastname,
                    major: "" + major,
                    department: "" + department,
                    nation: "" + nation,
                    title: "" + title,
                    year: "" + year,
                    age: age,
                    active: active

                }),

            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('vinaja', responseJson)
                    // this.getidofuser()
                    // this.addfirstcategory()

                    resolve();
                })
                .catch((error) => {
                    console.error(error);
                    reject();
                });
        });
    }

    addFavCategory(category) {
        return new Promise((resolve, reject) => {

            if (category.isSelect === true) {

                const body = {
                    categoryname: "" + category.categoryname,
                    categorydetails: "" + category.categorydetails,
                    userid: [
                        ...category.userid,
                        "" + this.props.userid
                    ],
                    active: category.active

                };

                if (category.eventid.length !== 0) {
                    body.eventid = [...category.eventid];
                }

                fetch('http://172.25.79.95:8000/api/category/' + category.id, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),

                })

                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log('vinaja', responseJson)

                        resolve()
                    })
                    .catch((error) => {
                        console.error(error);

                        reject()
                    });
            }
            else {
                resolve()
            }
        })
    }

    // getCategories() {
    //     fetch('http://172.25.79.95:8000/api/category')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log('get categories', data)
    //             this.setState({ category: this.setCategoriesWithSelect(data) });
    //             console.log(this.props.userid)
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             alert("Fail")
    //         });
    // }

    // firstcategory(index) {
    //     fetch('http://172.25.79.95:8000/api/user', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             userid: "" + this.props.userid,
    //             firstname: "" + firstname,
    //             lastname: "" + lastname,
    //             major: "" + major,
    //             department: "" + department,
    //             nation: "" + nation,
    //             title: "" + title,
    //             year: "" + year,
    //             age: age,
    //             active: active

    //         }),

    //     })
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             console.log('vinaja', responseJson)
    //             // this.getidofuser()
    //             // this.addfirstcategory()
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }


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

    // addfirstcategory() {
    //     this.state.category.map((c) => {
    //         if (c.isSelect == true) {
    //             fetch('http://172.25.79.95:8000/api/category/' + c.id, {
    //                 method: 'PUT',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({

    //                     categoryname: ""+c.categoryname,
    //                     categorydetails: ""+c.categorydetails,
    //                     userid: [""+c.userid,
    //                     ""+this.props.userid
    //                     ],
    //                     eventid: [""+c.eventid],
    //                     active: c.active

    //             }),

    //         })

    //                 .then((response) => response.json())
    //                 .then((responseJson) => {
    //                     console.log('vinaja', responseJson)
    //                 })
    //                 .catch((error) => {
    //                     console.error(error);
    //                 });
    //         }
    //     })
    // }


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

                                    this.addUser()
                                        .then(() => {
                                            // const actions = this.state.category.map(c => this.addFavCategory(c));
                                            // const actions = this.state.category.map(c => 5);
                                            // console.log(actions);
                                            return Promise.all(this.state.category.map(c => this.addFavCategory(c)));
                                        })
                                        .then(() => {
                                            alert('All Success');
                                            Actions.Home({userid: this.props.userid});

                                        })
                                        .catch((error) => {
                                            console.error(error);
                                            alert('Not Success');

                                        });



                                }}
                            >
                                <Text style={{ color: "white", fontSize: 20 }}>
                                    OK
                                     </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
        );
    }
}

export default Category;
