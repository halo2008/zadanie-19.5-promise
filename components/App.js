var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'YvzDQLczUTtjkk4ArVJGN8j2sqqDG5RG';

var App = React.createClass({

  getInitialState() {
    return  {
      loading: false,
      gif: {}
    };
  },

  handleSearch: function(searchingText){
    this.setState({
      loading: true
    });
    this.getGif(searchingText).then(gif => {
      this.setState({
        loading: false,
        gif: gif,
        searchingText: searchingText
      });
    });
  },

  getGif: function(searchingText) {

    return new Promise (
      function(resolve, reject){
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        var xhr = new XMLHttpRequest();
        var statusText = "connection lost";
        xhr.onload = function() {
          if (xhr.status === 200) {
           var data = JSON.parse(xhr.responseText).data;
            var gif = {
                url: data.fixed_width_downsampled_url,
                sourceUrl: data.url
            };
            resolve(gif);
          }
        };
        xhr.onerror = function() {
            reject(new Error(
               `XMLHttpRequest Error: ${statusText}`));
        };
        xhr.open('GET', url);
        xhr.send();
    })
  },

  render: function(){
    var styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    }

    return (
      <div style={styles}>
        <h1>Wyszukiwarka Gifów</h1>
        <p>znajdź gifa na <a href="http://giphy.com">giphy</a>Naciskaj enter by pobrać kolejne Gify</p>
        <Search
          onShearch = {this.handleSearch}
        />
        <Gif
        loading={this.state.loading}
        url={this.state.gif.url}
        sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
});
