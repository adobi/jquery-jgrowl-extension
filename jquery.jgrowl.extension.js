(function() {
    window.cl = function(elem) {
        console.log(elem);
    };
    
    
    if (typeof $.jGrowl === 'function' && typeof $.cookie === 'function') {
        
        $.extendJGrowl = function() {
            
            var jgrowl = $('#jGrowl'),
                container = jgrowl.find('.jGrowl-notification');
                message = container.find('.jGrowl-message'),
                header = container.find('.jGrowl-header'),
                
                templateIn = $('<a></a>', {
                        href: 'javascript:void(0)'
                    }).addClass('jg-ext-link jg-ext-link-in').html('&#45;'),
                    
                templateOut = $('<a></a>', {
                        href: 'javascript:void(0)'
                    }).addClass('jg-ext-link  jg-ext-link-out').html('&#43;'),
                    
                messageHtml = $('<div/>', {'class': 'jg-inner-message'});
            
            message.html(messageHtml.html(message.html()));
            
            function toggleIn() {
                container.css({
                    'width': '40px'
                });                
                header.hide();
                
                message.find('.jg-inner-message').hide();
                message.append($('<span></span>', {html: message.find('p').length, 'class': 'jg-item-counter'}).show());
            };
            
            function toggleOut() {
                container.css({
                    'width': '235px'
                });
                                
                header.show();
                message.find('span:first').remove();
                message.find('.jg-inner-message').show();

            }
            
            if ($.cookie('jg')) {
                if ($.cookie('jg') === 'in') {
                    
                    toggleIn();
                    
                    container.find('.jGrowl-close').after(templateOut);
                    
                } else {
                    
                    toggleOut();
                    
                    container.find('.jGrowl-close').after(templateIn);
                    
                    
                }
            } else {
                container.prepend(templateIn);
            }
            
            container.delegate('.jg-ext-link-in', 'click', function() {
                
                toggleIn();
                
                $.cookie('jg', 'in', { expires: 70, path: '/'});
                
                $(this).remove();
                
                container.find('.jGrowl-close').after(templateOut);
                
            });
            
            container.delegate('.jg-ext-link-out', 'click', function() {
                
                toggleOut();
                
                $.cookie('jg', 'out', { expires: 70, path: '/'});
                
                $(this).remove();
                
                container.find('.jGrowl-close').after(templateIn);

            });
        }
    }
    
}) ();