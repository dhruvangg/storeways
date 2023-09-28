import React from 'react';
import Layout from '@theme/Layout';

export default function Hello() {
    return (
        <Layout title="Demo">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '20px',
                    padding: '15px',
                    width: '100%', 
                    margin: '0 auto'    
                }}>
                <iframe height="300" style={{width: '100%', maxWidth: '1200px', minHeight: '600px'}} scrolling="no" title="Untitled" src="https://codepen.io/dhruvangg/embed/dywKOoE?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
                    See the Pen <a href="https://codepen.io/dhruvangg/pen/dywKOoE">
                        Untitled</a> by Dhruvang Gajjar (<a href="https://codepen.io/dhruvangg">@dhruvangg</a>)
                    on <a href="https://codepen.io">CodePen</a>.
                </iframe>
                {/* <p>
                    Edit <code>pages/helloReact.js</code> and save to reload.
                </p> */}
            </div>
        </Layout>
    );
}