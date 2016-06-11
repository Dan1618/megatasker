directory.GetData = Backbone.Model.extend({

    initialize:function (attributes, options) {
        this.new_tab_name = this.attributes.new_tab_name;
        this.getDataFromLS();
    },
    
    getDataFromLS: function(){
        this.pageObject = localStorage.getItem('tasker2');
        this.pageObject = $.parseJSON(this.pageObject);
    },
    
    
    setNewTab: function(newTabName, newTabNameTrim){
        if(!this.pageObject){
            this.pageObject = [];
        }
        
        var TabObject = new this.NewTabObject(newTabName, newTabNameTrim);
        this.pageObject.push(TabObject);
        
        localStorage.setItem('tasker2', JSON.stringify(this.pageObject));
    },
    
    removeTab: function(activeTrim){
        //removing array with value TabNameTrim = activeTrim 
        //(linking functions without i findwhere)
        this.pageObject = _.without(this.pageObject, _.findWhere(this.pageObject, {TabNameTrim: activeTrim}));
        localStorage.setItem('tasker2', JSON.stringify(this.pageObject));
    },
    
    addNewTask : function(task, activeTrim){
        //object tasks access
        var openTrimTab = _.findWhere(this.pageObject, {TabNameTrim: activeTrim})
        var openTasks = openTrimTab['tasks'];
        openTasks.push(task);
         openTasks.sort(function(a,b){return b.priority - a.priority});
         localStorage.setItem('tasker2', JSON.stringify(this.pageObject));
         directory.freshView.addNewTask(openTrimTab, activeTrim);
    },
    
    removeTask: function(taskIndex, activeTrim){
        var openTasks = _.findWhere(this.pageObject, {TabNameTrim: activeTrim})['tasks'];
        openTasks.splice(taskIndex, 1);
        localStorage.setItem('tasker2', JSON.stringify(this.pageObject));
    },
    
    taskChange: function(e, taskProp, taskPropValue){
        var activeTrim = getActiveTab();
        var taskIndex = $('#'+activeTrim+" .eachTask").index(e);
        var openTrimTab = _.findWhere(this.pageObject, {TabNameTrim: activeTrim})
        var openTasks = openTrimTab['tasks'];
        openTasks[taskIndex][taskProp] = taskPropValue;
        openTasks[taskIndex]["massage"] = e.find('.taskText').val();

        openTasks.sort(function(a,b){return b.priority - a.priority});
             
        localStorage.setItem('tasker2', JSON.stringify(this.pageObject));
        if(taskProp === 'priority'){
        var tabContent=0;
        directory.freshView.taskChange(activeTrim, openTrimTab, tabContent );}
        
        //we dont add parent element of tasks
    },
    
    deleteSelected: function(){
        var activeTrim = getActiveTab();
        var openTrimTab = _.findWhere(this.pageObject, {TabNameTrim: activeTrim });
        var openTasks = openTrimTab['tasks'];
        openTrimTab['tasks'] = openTasks.filter(function (e) {
                                    return e.checked === false;
                               });
        localStorage.setItem('tasker2', JSON.stringify(this.pageObject));
        // using function addNewTask to refresh view, lols
        directory.freshView.addNewTask(openTrimTab, activeTrim);
    },
    

    NewTabObject: function(TabName, TabNameTrim){
        this.TabName = TabName;
        this.TabNameTrim = TabNameTrim;
        this.tasks = [];
    } 
});