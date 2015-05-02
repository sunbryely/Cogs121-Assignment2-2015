(function() {
  $.getJSON( '/igMediaCounts')
    .done(function( data ) {
      var yCounts = data.users.map(function(item){
        return item.counts.follows;
      });

       yCounts.unshift('User Follows');

var chart = c3.generate({
    data: {
       // xs: {
         // Follows: 'Follows_x',         
       // },
        columns: 
            [yCounts],
      type: "scatter"
    }
});


   });
})();
