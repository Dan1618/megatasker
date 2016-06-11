directory.View = Backbone.View.extend({
      initialize: function() {
          this.render();
      },
      render: function(){
          //array with objects TaskTabow below
        _.each(directory.model.pageObject, function(eachObject)
        {
        //eachObject is single object from array
            $("#taskTabs").append(tpl.get('menuItem').apply(eachObject));
            // adding parent elements of tabContent
            var tabContent='1';
            $('#content').append(tpl.get('taskItems').call(eachObject, tabContent));
        });
        $('#content').find('div').first().addClass('in active');
        $('#taskTabs').find('li').first().addClass('active');
        this.addSliders();
      },
      setNewTab: function(newTabName, newTabNameTrim){
          var tabObject = new this.NewTabObject(newTabName, newTabNameTrim);
          $("#taskTabs").append(tpl.get('menuItem').apply(tabObject));
          $("#content").append(tpl.get('tasksContainer').apply(tabObject));
          $('a[href="#'+ tabObject.TabNameTrim +'"]').click();
      },
      
      addSliders: function(){
        $( ".taskPrioritySlider" ).slider({
            range: "min",
            value: this.create,
            min: 1,
            max: 100,
            create: function(){
                $(this).slider('value',$(this).closest('.eachTask').find('.taskPriority').val());
            },
            slide: function( event, ui ) {
                $(this).closest('.eachTask').find('.taskPriority').val( ui.value );
            },
            stop: function( event, ui ) {
                propValue = ui.value;
                directory.model.taskChange($(this).closest('.eachTask'), 'priority', propValue);
            }
        });
      },
      
      addNewTask: function(openTrimTab, activeTrim){
          $('#'+activeTrim+" ul").html(tpl.get('taskItems').apply(openTrimTab));
          this.addSliders();
      },
      saveNewTask : function(){
            
      },
      taskChange : function(activeTrim, openTrimTab, tabContent ){
        $('#'+activeTrim+" ul").html(tpl.get('taskItems').call(openTrimTab, tabContent));
        this.addSliders();
      },
      
        NewTabObject: function(TabName, TabNameTrim){
            this.TabName = TabName;
            this.TabNameTrim = TabNameTrim;
        }
});

