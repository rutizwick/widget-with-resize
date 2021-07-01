define(['react', 'Wix'], function (React, Wix) {
  return React.createClass({
    getInitialState: () => {
      return {
        settingsUpdate: {},
        showBox: false,
      };
    },
    componentDidMount: function () {
      const device = Wix.Utils.getDeviceType();
      //
      this.updateCompHeight(600);
      Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, (data) =>
        this.onSettingsUpdate(data)
      );
      if (device === 'mobile') {
        Wix.resizeWindow(400, 400, console.log('resize window on mount'));
      }
      Wix.addEventListener(Wix.Events.DEVICE_TYPE_CHANGED, function (event) {
        Wix.resizeWindow(400, 400, console.log('resize window on change'));
      });
    },
    onSettingsUpdate: function (update) {
      this.setState(
        {
          settingsUpdate: update,
          showBox: true,
        },
        this.updateCompHeight
      );
    },
    updateCompHeight: (height) => {
      const desiredHeight = height || document.documentElement.scrollHeight;
      Wix.setHeight(desiredHeight);
    },
    navToHome: () => {
      Wix.getSiteMap((pages) => {
        Wix.navigateToPage(pages[0].pageId.substring(1));
      });
    },
    stringify: (input) => {
      try {
        return JSON.stringify(input, null, 4);
      } catch (err) {
        return input;
      }
    },
    render: function () {
      const { settingsUpdate } = this.state;
      return (
        <div>
          <div className='wix-style-sample'>
            <h3 className='sample-element sample-title'>{'Demo App'}</h3>
            <p className='sample-element sample-content'>
              {"Welcome to the Wix Demo App, let's play!"}
            </p>
            <form className='form'>
              <input
                title='email'
                type='email'
                className='sample-element sample-input'
                placeholder='Enter text here'
                value={this.props.email}
              />
            </form>
            <button
              onClick={() => {
                const device = Wix.Utils.getDeviceType();
                console.log('device type', device);
              }}
              className='sample-element sample-button'
            >
              {'get device type'}
            </button>
            <br />
            <a onClick={() => this.navToHome()}>{'Go to Home Page'}</a>
            <br />
            <hr />
            <div className={this.state.showBox ? '' : 'hiddenBox'}>
              <h3 className='sample-element sample-title'>
                {'Last settings update'}
              </h3>
              <pre>
                <code className='json sample-content'>
                  {this.stringify(settingsUpdate)}
                </code>
              </pre>
            </div>
          </div>
        </div>
      );
    },
  });
});
