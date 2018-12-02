var mainUrl = "http://comp426.cs.unc.edu:3001/";
$(document).ready(function () {

    //go to the register interface
    $(document).on("click", "#register", function () {
        let body = $("body");
        body.empty();
        body.append("<h1>New User</h1>");
        body.append("<div id=\"register_div\"></div>");
        $("#register_div").append("User:<input type=\"text\" id=\"register_user\"><br>Password: <input type=\"password\" id=\"register_pass\"><br>");
        $("#register_div").append("<button id=\"register_btn\">Sign Up</button>");
        body.append("<span id=\"back\">Click here to return back</span>");
    });
    //go back to login interface

    $(document).on("click", "#back", function () {
        build_login_interface();
    });

    //create a new account
    $(document).on("click", "#register_btn", function () {
        let user = $('#register_user').val();
        let pass = $('#register_pass').val();
        $.ajax(mainUrl + 'users', {
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            data: {
                user: {
                    username: user,
                    password: pass
                }
            },
            async:false,
            success: function () {
                alert('registered successfully');
                build_login_interface();
            },
            error: function () {
                alert('This username has been already taken');
            }
        });
    });

    //login
    $(document).on("click", "#login_btn", function () {
        let user = $('#login_user').val();
        let pass = $('#login_pass').val();
        $.ajax(mainUrl + 'sessions', {
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            data: {
                user: {
                    username: user,
                    password: pass
                }
            },
          
            success: function () {
                build_main_interface();
            },
            error: function () {
                alert('username/password is incorrect');
            }
        });
    });

    //log off
    $(document).on("click", "#log_off", function () {
        $.ajax(mainUrl + 'sessions', {
            type: "DELETE",
            xhrFields: {
                withCredentials: true
            },
            async:false,
            success: function () {
                build_login_interface();
            },
            error: function () {
                alert("action failed");
            }
        });
    });

    //change_password_interface
    $(document).on("click", "#change_pass", function () {
        let body = $("body");
        body.empty();
        body.append("<h1>Change Your Password</h1>");
        body.append("<div id=\"change_div\"></div>");
        $("#change_div").append("Username:<input type=\"text\" id=\"change_user\"><br>")
        $("#change_div").append("Old Password: <input type = \"password\" id=\"old_pass\"><br>");
        $("#change_div").append("New Password: <input type = \"password\" id=\"new_pass\"><br>");
        $("#change_div").append("<button id=\"change_btn\">Change Password</button>");
    });

    //change_password
    $(document).on('click', '#change_btn', function () {
        let username = $("#change_user").val();
        console.log(username);
        let old_pass = $("#old_pass").val();
        console.log(old_pass);
        let new_pass = $("#new_pass").val();
        console.log(new_pass);
        $.ajax(mainUrl + 'passwords', {
            type: "PUT",
            xhrFields: {
                withCredentials: true
            },
            data: {
                user: {
                    username: username,
                    old_password: old_pass,
                    new_password: new_pass
                }
            },
            async:false,
            success: function () {
                alert("change successfully");
            },
            error: function () {
                alert("action failed")
            }
        })
    });


    //build_main_interface
    build_main_interface = function () {
        let body = $("body");
        body.empty();
        body.append("<h1>Book your next fantastic flight</h1>")
        search_div = ("<div id=\"search_div\"></div>");
        body.append(search_div);
        search = $("#search_div");
        search.append('<input type="text" id="source" value=\"Seattle\" placeholder="From City or Airport"><br>');
        search.append('<input type="text" id="destination" value=\"New York\" placeholder="To City or Airport"><br>');
        search.append('<input type="text" value=\"2019-01-22\" id="d_date"><br>');
        search.append('<button id="search_btn">Search</button>');

        body.append('<div id="result_div"></div>');


        body.append('<button id="log_off">Log Off</button>');


    }
    //build_login_interface
    build_login_interface = function () {
        let body = $("body");
        body.empty();
        body.append("<h1>What the fuck</h1>");
        body.append("<div id=\"login_div\"></div>");
        $("#login_div").append("User:<input type=\"text\" id=\"login_user\"><br>Password: <input type=\"password\" id=\"login_pass\"><br>");
        $("#login_div").append(" <button id=\"login_btn\">Login</button>");
        body.append("<span id=\"register\">Click here to create a new account</span><br>");
        body.append("<span id=\"change_pass\">Click here to change your password</span>");
    }
    //search
    $(document).on("click", "#search_btn", function () {
        let source = $("#source").val();
        let source_id = 0;
        let destination = $("#destination").val();
        let destination_id = 0;
        let date = $("#d_date").val();
        $.ajax(mainUrl + "airports", {
            data: "GET",
            xhrFields: {
                withCredentials: true
            },
            datatype: JSON,
            async:false,
            success: function (response) {
                for (i = 0; i < response.length; i++) {
                    if (response[i].city == source) {
                        source_id = response[i].id;
                    }
                }
                $.ajax(mainUrl + "airports", {
                    data: "GET",
                    xhrFields: {
                        withCredentials: true
                    },
                    datatype: JSON,
                    async:false,
                    success: function (response) {
                        for (i = 0; i < response.length; i++) {
                            if (response[i].city == destination) {
                                destination_id = response[i].id;
                            }
                        }
                        $.ajax(mainUrl + "flights", {
                            data: "GET",
                            xhrFields: {
                                withCredentials: true
                            },
                            datatype: JSON,
                            async:false,
                            success: function (response) {
                                for (i = 0; i < response.length; i++) {
                                    if (response[i].departure_id == source_id && response[i].arrival_id == destination_id) {
                                       
                                        flight_id = response[i].id;
                                        console.log(flight_id);
                                        console.log("sada");
                                        $.ajax(mainUrl + "instances", {
                                            data: "GET",
                                            xhrFields: {
                                                withCredentials: true
                                            },
                                            datatype: JSON,
                                            async:false,
                                            success: function (response) {
                                                console.log(response);  
                                                for (i = 0; i < response.length; i++) {
                                                   
        
                                                    if (response[i].date == date && response[i].flight_id == flight_id) {
                                                       
                                                    }
                                                }
                                            }

                                        });
                                    }
                                }
                            },
                            error: function () {
                                alert("error");
                            }
                        });
                    }
                })


            }
        });







    });

});