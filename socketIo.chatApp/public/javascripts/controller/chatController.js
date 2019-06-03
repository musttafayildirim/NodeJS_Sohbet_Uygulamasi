app.controller('chatController', ['$scope', 'chatFactory', 'userFactory', ($scope, chatFactory, userFactory) => {


    /**
     * TANıMLAMA İŞLEMİ
     * */

    function init() {
        userFactory.getUser().then(user =>{
            $scope.user = user;
        });
    }

    init();



    /**
    * ANGULAR DEĞİŞKENLERİ
    * */

    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.activeTab = 1;
    $scope.chatClicked = false;
    $scope.chatName = "";
    $scope.message ="";
    $scope.messages = [];
    $scope.roomId = "";
    $scope.user = {};
    $scope.loadingMessages = false;
    /**
     * Socket.io işlemleri
     * */

    const socket = io.connect("http://localhost:3000");

    socket.on('onlineList', users => {
        // console.log(users);
        $scope.onlineList = users;
        $scope.$apply();
    });

    //random oda oluşturma
    $scope.newRoom = () => {
        // let randomName = Math.random().toString(36).substring(7)
        // console.log(randomName)

        let roomName = window.prompt("Oda adı gir..");
        if(roomName !== '' && roomName !== null ){
            socket.emit('newRoom', roomName);
        }

    };

    //odaları seçme
    $scope.switchRoom = room => {
        $scope.chatName = room.name;
        $scope.roomId = room.id;
        $scope.chatClicked = true;

        if(!$scope.messages.hasOwnProperty(room.id)){
            $scope.loadingMessages = true;

            //console.log("servise bağlanıyor..");
            chatFactory.getMessages(room.id).then(data =>{
                //console.log(data);
                $scope.messages[room.id] = data;
                $scope.loadingMessages = false;
            });
        }





    };


    //odalarin listelenmesi
    socket.on('roomList', rooms => {
      $scope.roomList =rooms;
      $scope.$apply();
    });


    socket.on('receiveMessage', data => {
        $scope.messages[data.roomId].push({
            userId : data.userId,
            username : data.username,
            surname : data.surname,
            message : data.message
        });
        $scope.$apply();
    });

    $scope.newMessage = () => {
        // console.log($scope.message);
        // console.log($scope.roomId);

        if($scope.message.trim() !== ''){
            socket.emit('newMessage',{
                message : $scope.message,
                roomId : $scope.roomId
            });

            //mesajı gönderenin anında gönderdiği mesajı ekranda görüntülenmesini sağlıyorum.....
            $scope.messages[$scope.roomId].push({
                userId : $scope.user._id,
                username : $scope.user.name,
                surname : $scope.user.surname,
                message : $scope.message
            });


            $scope.message = '';

        }
    };


    //frond-end işlemleri
    $scope.changeTab = tab => {
        $scope.activeTab = tab;
    };


}]);