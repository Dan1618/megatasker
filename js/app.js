var getActiveTab = function (){
    //TODO: Use var only once and separate next vars with comma
    //TODO: Why not simpler selector: '#taskTabs .active A'
     var activeTab = $('#taskTabs').find('.active').find('a');
    var activeTrim = activeTab.attr('href');
    activeTrim = activeTrim.substring(1);
    return activeTrim;
};

var comparePriority = function(a,b) {
    //TODO: Use brackets for better readability (check added .jshint file)
    if (a.priority > b.priority)
       return -1;
    if (a.priority <= b.priority)
      return 1;
    return 0;
}

tpl = {
 
    templates: {},
 
    loadTemplates: function(names, callback) {
 
        var that = this;
 
        var loadTemplate = function(index) {
            var name = names[index];
            console.log('Loading template: ' + name);
            $.get('tpl/' + name + '.html', function(data) {
                that.templates[name] = _.template(data);
                index++;
                if (index < names.length) {
                    loadTemplate(index);
                } else {
                    callback();
                }
            });
        }
 
        loadTemplate(0);
    },
 
    // Get template by name from hash of preloaded templates
    get: function(name) {
        return this.templates[name];
    }
 
};

$( document ).ready(function(){
    
    tpl.loadTemplates(['menuItem', 'newTaskItem', 'taskItems', 'tasksContainer'], function() {
        directory.router = new directory.Router();
        
    });

    $('.js-newTab').on('click', function(){
        var new_name = $(this).closest('.input-group').find('input').val();
        var new_name_trim = new_name.replace(/\s+/g, '');
        if(new_name){
            directory.router.addNewTab(new_name, new_name_trim);}
        else {
            alert('place a name of new category');}
    });
    
    $('.js-removeTab').on('click', function(){
        if(confirm("Do you want to delete active tab?")){
            var activeTab = $('#taskTabs').find('.active').find('a');
            var activeTrim = activeTab.attr('href');
            activeTrim = activeTrim.substring(1);
            directory.router.removeTab(activeTrim);
            //DOM removing
            $('#'+activeTrim).remove();
            $('#taskTabs').find('.active').remove();
            $('#taskTabs:first-child').click();
        }
    });
    //TODO: Store selectors as variables (http://jsperf.com/caching-jquery-selectors/6)
    //TODO: do not assign all events to body, but some lower level container for better modularity
    $('body').on('mouseover','.eachTask', function() {
        $(this).find('.botRight').removeClass('displayNone');
        $(this).find('.botLeft').removeClass('displayNone');
    });
    $('body').on('mouseleave','.eachTask', function(){
        if($(this).find('.taskPriority').is(":focus")){}
        else{
            $(this).find('.botRight').addClass('displayNone');
            $(this).find('.botLeft').addClass('displayNone');
        }
    });
    $('body').on('change', '.selectTask', function(){
        if($(this).is(':checked')){
            $(this).closest('.eachTask').addClass('bluebg');
        } else {
            $(this).closest('.eachTask').removeClass('bluebg');
        }
    });
    $('body').on('click','.saveTaskButton', function(){
        var activeTab = getActiveTab();
        var activeTabObject =  _.findWhere(directory.model.pageObject, {TabNameTrim: activeTab});
        var activeTabObjectLength = Object.keys(activeTabObject);
    });
    
    $('body').on('click','#addNewTask', function(){
        var activeTab = getActiveTab();
        if($('#'+activeTab+' .newTask').length){ //if new task window exists, do not add new task
        } else {
            $("#"+activeTab+" ul").prepend(tpl.get('newTaskItem'));
        }
    });
    
    $('body').on('click','.addTask', function(){
        directory.router.addNewTask($(this).closest('.eachTask').find('.newTaskPriority'));
    });
    
    $('body').on('keydown','.newTaskText', function(event){
        if (event.ctrlKey && event.keyCode == 13) {
            directory.router.addNewTask($(this).closest('.eachTask').find('.newTaskPriority'));
        }
    });

    $('body').on('keydown','.newTaskPriority', function(event){
        if (event.keyCode == 13) {
            directory.router.addNewTask($(this).closest('.eachTask').find('.newTaskPriority'));
        }
    });
    
    $('body').on('click','.newTaskRemove', function(){
        $(this).closest('.eachTask').remove();
    });
    
    $('body').on('click','.taskRemove', function(){
        directory.router.removeTask($(this).closest('.eachTask'));
    });
    
    $('body').on('click','.selectTask', function(){
        directory.router.selectTask($(this).closest('.eachTask'));
    });
    
    $('body').on('keydown','.taskPriority', function(event){
        if(event.keyCode==13){
            directory.router.taskChange(event, $(this));
        }
    });
    
    $('body').on('click','.saveTask', function(event){
        directory.router.taskChange(event , $(this).closest('.eachTask').find('.taskPriority'));
    });
    
    $('body').on('keydown','.taskText', function(event){
        if (event.ctrlKey && event.keyCode == 13) {
            directory.router.taskChange(event , $(this).closest('.eachTask').find('.taskPriority'));
        }
    });
    
    $('body').on('click','#selectAll', function(){
        var activeTab = getActiveTab();
        $("#"+activeTab).find('.selectTask:not(:checked)').click();
    });
    $('body').on('click','#clearSelection', function(){
        var activeTab = getActiveTab();
        $("#"+activeTab).find('.selectTask:checked').click();
    });
    $('body').on('click','#deleteSelected', function(){
        directory.router.deleteSelected(getActiveTab());
    });
    
}); 