/**
 * HABS TECHNOLOGIES GROUP
 * Test Images Page - For testing image display system
 */

'use client';

import DynamicImage, { DynamicBackgroundImage } from '@/components/dynamic-image';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function TestImagesPage() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>Image System Test Page</h1>
      <p>This page helps you test if images are displaying correctly from the admin dashboard.</p>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Hero Background Test</h2>
        <DynamicBackgroundImage 
          sectionId="hero-bg" 
          page="homepage" 
          className="test-hero"
          style={{ height: '300px', border: '2px dashed #ccc', marginBottom: '1rem' }}
        >
          <div style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
            <h3>Hero Background Test</h3>
            <p>If you see a background image, the system is working!</p>
          </div>
        </DynamicBackgroundImage>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Service Icons Test</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <Card className="">
            <CardHeader className="">
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <DynamicImage 
                  sectionId="service-ai" 
                  page="homepage" 
                  alt="AI Solutions Icon"
                  size="medium"
                />
              </div>
              <CardTitle className="">AI Solutions</CardTitle>
            </CardHeader>
            <CardContent className="">
              <p>Test for AI services icon</p>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="">
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <DynamicImage 
                  sectionId="service-web" 
                  page="homepage" 
                  alt="Web Development Icon"
                  size="medium"
                />
              </div>
              <CardTitle className="">Web Development</CardTitle>
            </CardHeader>
            <CardContent className="">
              <p>Test for web development icon</p>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="">
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <DynamicImage 
                  sectionId="service-creative" 
                  page="homepage" 
                  alt="Creative Tech Icon"
                  size="medium"
                />
              </div>
              <CardTitle className="">Creative Tech</CardTitle>
            </CardHeader>
            <CardContent className="">
              <p>Test for creative tech icon</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Instructions</h2>
        <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
          <ol>
            <li>Go to <strong>/admin/media</strong> in your admin dashboard</li>
            <li>Upload some images (JPEG, PNG, WebP, or GIF)</li>
            <li>Click the link icon (🔗) on uploaded images</li>
            <li>Assign images to these section IDs:
              <ul>
                <li><code>hero-bg</code> - for the hero background</li>
                <li><code>service-ai</code> - for AI services icon</li>
                <li><code>service-web</code> - for web development icon</li>
                <li><code>service-creative</code> - for creative tech icon</li>
              </ul>
            </li>
            <li>Refresh this page to see if images display correctly</li>
            <li>If images don&apos;t show, check the browser console for error messages</li>
          </ol>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Debug Information</h2>
        <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.875rem' }}>
          <p>Open browser developer tools (F12) and check the Console tab for debug messages.</p>
          <p>Look for messages like:</p>
          <ul>
            <li>&quot;Loading image for section: service-ai, page: homepage&quot;</li>
            <li>&quot;Image data from page mapping: ...&quot; or &quot;Using image from MEDIA collection: ...&quot;</li>
            <li>Any error messages that might indicate connection issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
