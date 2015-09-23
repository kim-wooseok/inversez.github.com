// http://steadypost.net/post/knowhow/id/161/
var Cookie =
{
    cookie_arr : null,

    set : function (name,value,options)
    {
        options = options || {};

        this.cookie_arr = [escape(name) + '=' + escape(value)];
 
        //-- expires
        if (options.expires)
        {
            if( typeof options.expires === 'object' && options.expires instanceof Date )
            {
                var date = options.expires;
                var expires = "expires=" + date.toUTCString();
                this.cookie_arr.push (expires);
            }
        }
        else if (options.expires_day)
        {
            this.set_expires_date (options.expires_day , 24*60*60);
        }
        else if (options.expires_hour)
        {
            this.set_expires_date (options.expires_hour , 60*60);
        }
 
        //-- domain
        if (options.domain)
        {
            var domain = "domain=" + options.domain;
            this.cookie_arr.push (domain);
        }
 
        //-- path
        if (options.path)
        {
            var path = 'path=' + options.path;
            this.cookie_arr.push (path);
        }
 
        //-- secure
        if( options.secure === true )
        {
            var secure = 'secure';
            this.cookie_arr.push (secure);
        }
 
        document.cookie = this.cookie_arr.join('; ');
        //console.log (this.cookie_arr.join('; '));
    },
 
    get : function (name)
    {
        var nameEQ = escape(name) + "=";
        var ca = document.cookie.split(';');
 
        for(var i=0;i < ca.length;i++)
        {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length,c.length));
        }
        return null;
    },
 
    del : function (name , options)
    {
        options = options || {};
        options.expires_day = -1;
        this.set ( name , '' , options );
    },
 
    set_expires_date : function (expires , time)
    {
        var date = new Date();
        date.setTime(date.getTime()+(expires*time*1000));
        var expires = "expires=" + date.toUTCString();
        this.cookie_arr.push (expires);
    }
};