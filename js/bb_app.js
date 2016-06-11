var directory = {};

directory.Router = Backbone.Router.extend({
    
    initialize: function(){
        directory.model = new directory.GetData();
        directory.freshView = new directory.View();
    },
    
    home: function() {
    },
    
    events: {
//        "click .js-removeTab": function(){alert('elo');console.log('x');}
    },
    
    routes: {
        //in future from LS
//        "":                 "home",
//        "contact":          "contact",
//        "employees/:id":    "employeeDetails"
    },

    
    addNewTab: function(new_tab_name, new_name_trim){
        directory.model.setNewTab(new_tab_name, new_name_trim);
        directory.freshView.setNewTab(new_tab_name, new_name_trim);
    },
    
    removeTab: function(activeTrim){
        directory.model.removeTab(activeTrim);
    },
    
    addNewTask: function(e){
        var propValue = e.val();
        if(Math.floor(propValue) == propValue && $.isNumeric(propValue) && propValue>0 && propValue<101){
            var newTask = new this.EachTask(e);
            var activeTrim = getActiveTab();
            directory.model.addNewTask(newTask, activeTrim);
        }else{
            alert('the value must be number between 1 and 100');
        }
    },
    
    removeTask: function(e){
        var activeTrim = getActiveTab();
        var taskIndex = $('#'+activeTrim+" .eachTask").index(e);
        directory.model.removeTask(taskIndex, activeTrim);
        e.remove();
    },
    
    selectTask: function(e){
        propValue = e.find('.selectTask').prop("checked");
        directory.model.taskChange(e.closest('.eachTask'), 'checked', propValue);
    },
    
    taskChange: function(event, e){
        var propValue = e.val();
        //check if the value is between 1 and 100
        if(Math.floor(propValue) == propValue && $.isNumeric(propValue) && propValue>0 && propValue<101){
            directory.model.taskChange(e.closest('.eachTask'), 'priority', propValue);
        }
        else{
            alert('the value must be number between 1 and 100')
        }
    },
    
    deleteSelected: function(){
        directory.model.deleteSelected();
    },
    
    EachTask : function(e){
        
        var taskBox = e.closest('.eachTask');
        var massage = taskBox.find('textarea').val();
        var priority = taskBox.find('.taskPriority').val() || taskBox.find('.newTaskPriority').val();
        if(taskBox.find('.selectTask').length ){
            var checked = taskBox.find('.selectTask')
        }else{
            var checked = taskBox.find('.selectNewTask')
        }
        checked = checked.prop( "checked" );
        
        this.massage = massage;
        this.priority = priority;
        this.checked = checked;
    }
    
});


