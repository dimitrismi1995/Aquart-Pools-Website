import { useEffect, useRef, useState, type FormEvent, type ReactElement, type ReactNode } from 'react';
import { ArrowRight, Check, ChevronDown, ChevronUp, CircleAlert, ClipboardCheck, Droplets, FileText, HardHat, ImagePlus, Mail, Menu, Phone, Ruler, Send, Settings2, ShieldCheck, Sparkles, Wrench, X } from 'lucide-react';
import heroImage from '@assets/generated_images/aquart-pool-hero.jpg';

type FormValues = {
  name: string;
  phone: string;
  email: string;
  location: string;
  customerType: string;
  projectType: string;
  poolStatus: string;
  poolSize: string;
  description: string;
  contactMethod: string;
  preferredTime: string;
  consent: boolean;
};

const initialForm: FormValues = {
  name: '',
  phone: '',
  email: '',
  location: '',
  customerType: '',
  projectType: '',
  poolStatus: '',
  poolSize: '',
  description: '',
  contactMethod: 'Phone',
  preferredTime: '',
  consent: false,
};

const services = [
  { title: 'Pool Construction', icon: HardHat, copy: 'Enquiries for designing and constructing suitable swimming-pool projects for homes, villas, and properties.', tone: 'navy' },
  { title: 'Pool Renovation', icon: Sparkles, copy: 'Renovation enquiries for updating the appearance, function, equipment, or finish of an existing pool.', tone: 'aqua' },
  { title: 'Pool Maintenance', icon: Droplets, copy: 'Pool-care enquiries for cleaning, servicing, water checks, equipment support, and ongoing maintenance.', tone: 'sand' },
  { title: 'Pool Repairs', icon: Wrench, copy: 'Repair enquiries relating to visible pool issues, equipment, circulation, finishes, or other pool-related problems.', tone: 'orange' },
  { title: 'Equipment and Upgrades', icon: Settings2, copy: 'Enquiries about suitable pumps, filters, lighting, covers, circulation systems, and pool equipment upgrades.', tone: 'aqua' },
  { title: 'Villa and Property Support', icon: ShieldCheck, copy: 'Pool-service enquiries for villa owners, property managers, landlords, and suitable commercial properties.', tone: 'navy' },
];

const problems = ['Pool construction planning', 'Old or damaged pool finishes', 'Water-quality concerns', 'Pump or filter problems', 'Pool equipment needing replacement', 'Pool renovation requirements', 'Pool lighting or cover enquiries', 'Ongoing maintenance needs', 'Unsure what service is required'];

const renovationItems = ['Pool surface and finish', 'Tiles and coping', 'Pool surrounds', 'Pumps and filters', 'Lighting', 'Covers', 'Circulation systems', 'Visible wear or damage', 'General refurbishment'];

const gallery = [
  ['01', 'New pool construction', 'Replace with approved project image'],
  ['02', 'Pool renovation', 'Replace with approved project image'],
  ['03', 'Pool surrounds', 'Replace with approved project image'],
  ['04', 'Pool equipment', 'Replace with approved project image'],
  ['05', 'Finished villa pool', 'Replace with approved project image'],
  ['06', 'Maintenance or repair work', 'Replace with approved project image'],
];

const faqs = [
  ['Do you build new swimming pools?', 'Aquart Pools accepts enquiries for pool construction projects. Project scope, feasibility, materials, permissions, pricing, and timeframe should be discussed directly with the company.'],
  ['Do you renovate existing pools?', 'Renovation enquiries may include finishes, equipment, surrounds, lighting, and other pool-related improvements, subject to assessment and feasibility.'],
  ['Do you offer pool maintenance?', 'Maintenance and servicing enquiries can be discussed depending on the location, pool type, equipment, requirements, and availability.'],
  ['How much does a new pool cost?', 'Pricing depends on the design, size, materials, site conditions, equipment, access, and project scope. Contact Aquart Pools for a project discussion.'],
  ['Can you repair pumps and filters?', 'Equipment support may be available depending on the system, fault, parts, and current capabilities. Send the equipment details for confirmation.'],
  ['Do you work across all Cyprus?', 'Service coverage should be confirmed based on the property location, project type, and availability.'],
  ['Can I send photographs of my existing pool?', 'Yes, you may send relevant photographs if requested. Avoid sending unnecessary personal information or identifiable people.'],
  ['Can I contact Aquart Pools through WhatsApp?', 'WhatsApp should be activated only after the business confirms that the listed mobile number accepts WhatsApp.'],
];

const selectOptions = {
  customerType: ['Homeowner', 'Villa owner', 'Landlord', 'Property manager', 'Property developer', 'Hotel or accommodation business', 'Other'],
  projectType: ['New pool construction', 'Pool renovation', 'Pool maintenance', 'Pool repair', 'Equipment upgrade', 'Not sure'],
  poolStatus: ['New project', 'Existing pool', 'Pool currently not in use', 'Not sure'],
};

function scrollToQuote() {
  document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Logo() {
  return (
    <a className="brand-mark" href="#top" data-testid="link-logo" aria-label="Aquart Pools home">
      <span className="brand-symbol" aria-hidden="true"><span /></span>
      <span><strong>Aquart</strong><small>POOLS / CYPRUS</small></span>
    </a>
  );
}

function PendingWhatsApp({ compact = false }: { compact?: boolean }) {
  return (
    <button type="button" className={`pending-whatsapp ${compact ? 'compact' : ''}`} disabled title="WhatsApp pending confirmation" data-testid="button-whatsapp-pending">
      <Send size={compact ? 16 : 17} aria-hidden="true" />
      <span>{compact ? 'Pending confirmation' : 'WhatsApp · Pending confirmation'}</span>
    </button>
  );
}

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [form, setForm] = useState<FormValues>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const quoteRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.title = 'Pool Construction, Renovation & Maintenance Cyprus | Aquart Pools';
    const description = 'Aquart Pools provides swimming-pool construction, renovation, maintenance, repairs, and equipment-related service enquiries across Cyprus.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
    const og = [
      ['og:title', document.title],
      ['og:description', description],
      ['og:type', 'website'],
      ['og:url', '[WEBSITE URL — VERIFY BEFORE PUBLISHING]'],
      ['og:image', '[SOCIAL IMAGE — REPLACE BEFORE PUBLISHING]'],
    ];
    og.forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', property); document.head.appendChild(tag); }
      tag.setAttribute('content', content);
    });
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Aquart Pools',
      telephone: '+35770088701',
      email: 'aquartpools@gmail.com',
      address: '[VERIFY BEFORE PUBLISHING]',
      areaServed: 'Cyprus — verify service coverage before publishing',
      url: '[WEBSITE URL — VERIFY BEFORE PUBLISHING]',
      openingHours: '[VERIFY BEFORE PUBLISHING]',
    };
    let script = document.getElementById('aquart-localbusiness-schema') as HTMLScriptElement | null;
    if (!script) { script = document.createElement('script'); script.id = 'aquart-localbusiness-schema'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(schema);
  }, []);

  const updateField = (field: keyof FormValues, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }));
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your full name.';
    if (!form.phone.trim()) nextErrors.phone = 'Please enter a phone number.';
    if (!form.location.trim()) nextErrors.location = 'Please add the property location.';
    if (!form.customerType) nextErrors.customerType = 'Please select the customer type.';
    if (!form.projectType) nextErrors.projectType = 'Please select the project type.';
    if (!form.description.trim()) nextErrors.description = 'Please describe the project or service needed.';
    if (!form.consent) nextErrors.consent = 'Please confirm that Aquart Pools may contact you.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSubmitted(true);
  };

  const handleService = (service: string) => {
    updateField('projectType', service === 'Pool Construction' ? 'New pool construction' : service === 'Pool Renovation' ? 'Pool renovation' : service === 'Pool Maintenance' ? 'Pool maintenance' : service === 'Pool Repairs' ? 'Pool repair' : service === 'Equipment and Upgrades' ? 'Equipment upgrade' : 'Not sure');
    scrollToQuote();
  };

  return (
    <main id="top">
      <header className="site-header">
        <div className="container-wide nav-inner">
          <Logo />
          <button className="menu-button" type="button" aria-expanded={navOpen} aria-controls="primary-nav" onClick={() => setNavOpen((open) => !open)} data-testid="button-mobile-menu">
            {navOpen ? <X size={22} /> : <Menu size={22} />} <span>Menu</span>
          </button>
          <nav id="primary-nav" className={`primary-nav ${navOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
            {['Services', 'New Pools', 'Renovation', 'Maintenance', 'Projects', 'FAQs', 'Contact'].map((item) => (
              <a href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setNavOpen(false)} key={item} data-testid={`link-nav-${item.toLowerCase().replace(' ', '-')}`}>{item}</a>
            ))}
            <button className="button button-orange nav-quote" type="button" onClick={() => { setNavOpen(false); scrollToQuote(); }} data-testid="button-nav-quote">Request a Quote <ArrowRight size={16} /></button>
          </nav>
        </div>
      </header>

      <section className="hero-section" aria-labelledby="hero-title">
        <div className="container-wide hero-grid">
          <div className="hero-copy">
            <div className="eyebrow reveal">AQUART POOLS / CYPRUS</div>
            <h1 id="hero-title" className="serif reveal reveal-delay-1">Swimming Pool <em>Construction,</em> Renovation &amp; Maintenance</h1>
            <p className="hero-lede reveal reveal-delay-2">Professional pool-service enquiries for new construction, renovation, maintenance, repairs, and equipment upgrades across Cyprus.</p>
            <div className="hero-actions reveal reveal-delay-3">
              <button type="button" className="button button-orange" onClick={scrollToQuote} data-testid="button-hero-quote">Request a Pool Quote <ArrowRight size={17} /></button>
              <a className="button button-outline" href="tel:+35770088701" data-testid="link-hero-call"><Phone size={16} /> Call Aquart Pools</a>
            </div>
            <div className="hero-secondary reveal reveal-delay-3"><PendingWhatsApp /> <span className="trust-line">Pool construction <i /> Renovation <i /> Maintenance <i /> Repairs</span></div>
            <p className="location-line"><span className="location-dot" /> Serving Cyprus — confirm service coverage before publishing.</p>
          </div>
          <div className="hero-media-wrap reveal reveal-delay-2">
            <div className="hero-media">
              <video poster={heroImage} autoPlay muted loop playsInline preload="none" aria-label="Replaceable ten-second pool project video placeholder" />
              <img src={heroImage} alt="Modern swimming pool beside a Mediterranean villa" />
              <div className="media-wash" />
              <div className="video-placeholder">
                <span className="play-mark" aria-hidden="true"><span /></span>
                <span><strong>10-sec project film</strong><small>Replace with approved MP4</small></span>
              </div>
              <span className="media-coordinate mono">34° 42′ N / 33° 01′ E</span>
              <span className="media-tag mono">POOL / PROPERTY / TECHNICAL</span>
            </div>
            <div className="media-caption"><span>01</span><span>Calm water. Clear scope.</span><span className="caption-rule" /></div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Aquart Pools services">
        <div className="container-wide trust-grid">
          {['New pool construction', 'Pool renovation', 'Ongoing maintenance', 'Equipment and repair enquiries'].map((text, index) => (
            <div className="trust-item" key={text} data-testid={`text-trust-${index}`}><span className="trust-number mono">0{index + 1}</span><span>{text}</span><Check size={15} /></div>
          ))}
        </div>
      </section>

      <section className="section-pad services-section" id="services" aria-labelledby="services-title">
        <div className="container-wide">
          <div className="section-heading split-heading"><div><div className="eyebrow">THE FULL SCOPE</div><h2 id="services-title" className="serif">Complete Pool<br /><em>Services</em></h2></div><p>From the first conversation to the technical details that keep a pool ready, send an enquiry for the service your property needs.</p></div>
          <div className="services-grid">
            {services.map(({ title, icon: Icon, copy, tone }, index) => (
              <article className={`service-card service-${tone}`} key={title} data-testid={`card-service-${index}`}>
                <div className="service-top"><span className="service-index mono">0{index + 1}</span><Icon size={22} strokeWidth={1.5} /></div>
                <h3>{title}</h3><p>{copy}</p>
                <button className="text-link" type="button" onClick={() => handleService(title)} data-testid={`button-service-${index}`}>Ask About This Service <ArrowRight size={15} /></button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-panel section-pad" id="new-pools" aria-labelledby="new-pools-title">
        <div className="container-wide dark-split">
          <div><div className="eyebrow eyebrow-light">01 / NEW PROJECTS</div><h2 id="new-pools-title" className="serif">Planning a New<br /><em>Swimming Pool?</em></h2><p>Whether you are planning a new pool for a home, villa, or property development, send the basic project details to discuss the next step.</p><button type="button" className="button button-orange" onClick={scrollToQuote} data-testid="button-new-pool-quote">Discuss a New Pool Project <ArrowRight size={17} /></button></div>
          <div className="process-list">
            {[['01', 'Discuss the property and project requirements'], ['02', 'Review the proposed pool scope and options'], ['03', 'Arrange the next stage, subject to feasibility and availability']].map(([number, text]) => <div className="process-row" key={number}><span className="mono">{number}</span><span>{text}</span><ArrowRight size={17} /></div>)}
            <div className="technical-note"><Ruler size={18} /><span>Scope, materials, permissions, pricing, and timeframe require direct discussion and confirmation.</span></div>
          </div>
        </div>
      </section>

      <section className="section-pad renovation-section" id="renovation" aria-labelledby="renovation-title">
        <div className="container-wide renovation-grid">
          <div className="renovation-visual" aria-label="Replaceable image placeholder for pool renovation">
            <div className="visual-swatch visual-swatch-one" /><div className="visual-swatch visual-swatch-two" /><div className="visual-annotation mono">REPLACE WITH<br />APPROVED RENOVATION<br />IMAGE</div><div className="visual-figure"><Droplets size={58} strokeWidth={1} /></div>
          </div>
          <div><div className="eyebrow">02 / EXISTING POOLS</div><h2 id="renovation-title" className="serif">Give an Existing Pool<br /><em>a New Direction</em></h2><p>Renovation scope, materials, feasibility, pricing, and timeframe require assessment and confirmation.</p><div className="renovation-list">{renovationItems.map((item) => <span key={item}><Check size={14} />{item}</span>)}</div><button type="button" className="button button-navy" onClick={() => { updateField('projectType', 'Pool renovation'); scrollToQuote(); }} data-testid="button-renovation-quote">Request a Renovation Quote <ArrowRight size={17} /></button></div>
        </div>
      </section>

      <section className="maintenance-band" id="maintenance" aria-labelledby="maintenance-title">
        <div className="container-wide"><div className="eyebrow">03 / KEEP IT READY</div><h2 id="maintenance-title" className="serif">Keep Your Pool <em>Ready for Use</em></h2><p className="maintenance-intro">Practical maintenance enquiries for homes, villas, holiday properties, and suitable commercial locations.</p><div className="maintenance-cards">{([['Regular Pool Care', 'Enquiries for recurring cleaning, water checks, servicing, and maintenance.', Droplets], ['Villa Pool Support', 'Support enquiries for holiday homes, villas, and properties whose owners may not live nearby.', ShieldCheck], ['Equipment Maintenance', 'Enquiries about pumps, filters, circulation, lighting, and other suitable pool systems.', Settings2]] as const).map(([title, copy, ServiceIcon], index) => <article key={title} className="maintenance-card" data-testid={`card-maintenance-${index}`}><ServiceIcon size={24} /><h3>{title}</h3><p>{copy}</p><button type="button" className="text-link" onClick={() => handleService('Pool Maintenance')} data-testid={`button-maintenance-${index}`}>Send an enquiry <ArrowRight size={15} /></button></article>)}</div><p className="disclaimer">Service frequency, inclusions, availability, service area, and pricing must be confirmed with Aquart Pools.</p></div>
      </section>

      <section className="section-pad problems-section" aria-labelledby="problems-title">
        <div className="container-wide problems-grid"><div><div className="eyebrow">START WITH THE PROBLEM</div><h2 id="problems-title" className="serif">Need Help With a Pool <em>Project or Problem?</em></h2><p>Send the property location, pool details, and a short description. The team can review the enquiry and advise on the next step.</p><button className="button button-orange" type="button" onClick={scrollToQuote} data-testid="button-describe-project">Describe Your Project <ArrowRight size={17} /></button></div><div className="problem-list">{problems.map((problem, index) => <button type="button" className="problem-item" onClick={scrollToQuote} key={problem} data-testid={`button-problem-${index}`}><span className="mono">0{index + 1}</span>{problem}<ArrowRight size={15} /></button>)}</div></div>
      </section>

      <section className="section-pad gallery-section" id="projects" aria-labelledby="projects-title">
        <div className="container-wide"><div className="section-heading split-heading"><div><div className="eyebrow">REPLACEABLE GALLERY</div><h2 id="projects-title" className="serif">Pool Projects<br /><em>and Work Examples</em></h2></div><p>Use this gallery for approved project photography only. No project names, locations, client names, prices, or completion dates have been invented.</p></div><div className="gallery-grid">{gallery.map(([number, title, note], index) => <article className={`gallery-card gallery-${index + 1}`} key={number} data-testid={`card-gallery-${index}`}><div className="gallery-art"><span className="gallery-shape" /><span className="gallery-number mono">{number}</span></div><div className="gallery-meta"><h3>{title}</h3><span>{note}</span><span>Add project location only if approved</span></div></article>)}</div></div>
      </section>

      <section className="how-section section-pad" aria-labelledby="how-title">
        <div className="container-wide"><div className="eyebrow eyebrow-light">A CLEAR FIRST STEP</div><h2 id="how-title" className="serif">How a Pool <em>Enquiry Works</em></h2><div className="how-grid">{[['01', 'Send the details', 'Call, send a WhatsApp message, or complete the form with your property location and project requirements.'], ['02', 'Discuss the project', 'Share information about the pool, property, desired service, existing equipment, and any known problems.'], ['03', 'Arrange the next step', 'Subject to feasibility, availability, and service suitability, the team discusses inspection, quotation, design, construction, renovation, or maintenance.']].map(([number, title, copy]) => <article className="how-card" key={number}><span className="how-num mono">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div>
      </section>

      <section className="section-pad quote-section" id="quote" ref={quoteRef} aria-labelledby="quote-title">
        <div className="container-wide quote-grid">
          <div className="quote-intro"><div className="eyebrow">LET'S TALK POOLS</div><h2 id="quote-title" className="serif">Request a<br /><em>Pool Quote</em></h2><p>Tell us what is happening at the property. A few practical details help Aquart Pools understand the enquiry before the next conversation.</p><div className="quote-contact"><a href="tel:+35770088701" data-testid="link-quote-call"><Phone size={17} /> +357 70 088701</a><a href="mailto:aquartpools@gmail.com" data-testid="link-quote-email"><Mail size={17} /> aquartpools@gmail.com</a></div><div className="quote-side-note"><CircleAlert size={17} /><span>Submitting this form does not confirm an appointment, quote, project, or service.</span></div></div>
          <div className="form-shell">
            {submitted ? <div className="success-state" data-testid="status-form-success"><div className="success-icon"><Check size={25} /></div><div className="eyebrow">ENQUIRY RECEIVED</div><h3 className="serif">Thank you. Your enquiry has been received.</h3><p>Aquart Pools will review the details and contact you using your preferred method, subject to availability.</p><div className="success-actions"><a className="button button-navy" href="tel:+35770088701" data-testid="link-success-call"><Phone size={16} /> Call +357 70 088701</a><PendingWhatsApp compact /></div><button type="button" className="text-link" onClick={() => { setSubmitted(false); window.setTimeout(scrollToQuote, 0); }} data-testid="button-send-another">Send another enquiry <ArrowRight size={15} /></button></div> : <form onSubmit={handleSubmit} noValidate><div className="form-row"><Field label="Full name" required error={errors.name}><input id="name" value={form.name} onChange={(event) => updateField('name', event.target.value)} autoComplete="name" data-testid="input-full-name" /></Field><Field label="Phone number" required error={errors.phone}><input id="phone" type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} autoComplete="tel" data-testid="input-phone" /></Field></div><div className="form-row"><Field label="Email address" optional error={errors.email}><input id="email" type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} autoComplete="email" data-testid="input-email" /></Field><Field label="Property location" required error={errors.location}><input id="location" value={form.location} onChange={(event) => updateField('location', event.target.value)} placeholder="Town / area" data-testid="input-location" /></Field></div><div className="form-row"><Field label="Customer type" required error={errors.customerType}><select id="customerType" value={form.customerType} onChange={(event) => updateField('customerType', event.target.value)} data-testid="select-customer-type"><option value="">Select one</option>{selectOptions.customerType.map((option) => <option key={option}>{option}</option>)}</select></Field><Field label="Project type" required error={errors.projectType}><select id="projectType" value={form.projectType} onChange={(event) => updateField('projectType', event.target.value)} data-testid="select-project-type"><option value="">Select one</option>{selectOptions.projectType.map((option) => <option key={option}>{option}</option>)}</select></Field></div><div className="form-row"><Field label="Pool status" optional error={errors.poolStatus}><select id="poolStatus" value={form.poolStatus} onChange={(event) => updateField('poolStatus', event.target.value)} data-testid="select-pool-status"><option value="">Select one</option>{selectOptions.poolStatus.map((option) => <option key={option}>{option}</option>)}</select></Field><Field label="Approximate pool size" optional error={errors.poolSize}><input id="poolSize" value={form.poolSize} onChange={(event) => updateField('poolSize', event.target.value)} placeholder="Optional" data-testid="input-pool-size" /></Field></div><Field label="Short project or service description" required error={errors.description}><textarea id="description" rows={4} value={form.description} onChange={(event) => updateField('description', event.target.value)} placeholder="What would you like to discuss?" data-testid="textarea-description" /></Field><div className="form-row"><Field label="Preferred contact method" optional error={errors.contactMethod}><select id="contactMethod" value={form.contactMethod} onChange={(event) => updateField('contactMethod', event.target.value)} data-testid="select-contact-method"><option>Phone</option><option>WhatsApp — pending confirmation</option><option>Email</option></select></Field><Field label="Preferred day or time" optional error={errors.preferredTime}><input id="preferredTime" value={form.preferredTime} onChange={(event) => updateField('preferredTime', event.target.value)} placeholder="Optional" data-testid="input-preferred-time" /></Field></div><label className="upload-field" htmlFor="image-upload"><ImagePlus size={20} /><span><strong>{fileName || 'Add pool photographs (optional)'}</strong><small>{fileName ? 'Image selected — replace if needed' : 'JPG, PNG or similar. Avoid personal information.'}</small></span><input id="image-upload" type="file" accept="image/*" onChange={(event) => setFileName(event.target.files?.[0]?.name || '')} data-testid="input-image-upload" /></label><label className={`consent-label ${errors.consent ? 'has-error' : ''}`}><input type="checkbox" checked={form.consent} onChange={(event) => updateField('consent', event.target.checked)} data-testid="input-consent" /><span>I agree that Aquart Pools may contact me regarding this service enquiry.</span></label>{errors.consent && <p className="field-error" role="alert">{errors.consent}</p>}<p className="form-note">Feasibility, availability, pricing, materials, and scope must be confirmed with Aquart Pools. <a href="#footer" data-testid="link-privacy-form">Privacy-policy placeholder</a></p><button className="button button-orange button-submit" type="submit" data-testid="button-submit-quote">Send Enquiry <ArrowRight size={17} /></button></form>}
          </div>
        </div>
      </section>

      <section className="property-section section-pad" aria-labelledby="property-title"><div className="container-wide property-grid"><div className="property-mark"><span className="mono">CY / PROPERTY</span><div className="property-line" /><div className="property-circle"><span /></div></div><div><div className="eyebrow">FOR PEOPLE WHO LOOK AFTER PROPERTY</div><h2 id="property-title" className="serif">Pool Support for Homes,<br /><em>Villas, and Managed Properties</em></h2><p>A pool project or maintenance requirement often needs clear communication between owners, managers, and service providers. Contact Aquart Pools to discuss a suitable construction, renovation, repair, or maintenance requirement.</p><div className="owner-tags">{['Villa owners', 'Overseas property owners', 'Holiday-home owners', 'Landlords', 'Property managers', 'Property developers', 'Small hotels and accommodation providers'].map((tag) => <span key={tag}>{tag}</span>)}</div></div></div></section>

      <section className="about-section section-pad" aria-labelledby="about-title"><div className="container-wide about-grid"><div><div className="eyebrow">THE COMPANY</div><h2 id="about-title" className="serif">About<br /><em>Aquart Pools</em></h2></div><div className="about-copy"><p>Aquart Pools provides swimming-pool construction, renovation, maintenance, repair, and equipment-related services in Cyprus. This section should be updated with verified company information, team details, experience, project examples, qualifications, service areas, and capabilities before publication.</p><div className="internal-note"><FileText size={17} /><span>Replace this placeholder with owner-approved information before publishing.</span></div></div></div></section>

      <section className="service-area-section section-pad" aria-labelledby="area-title"><div className="container-wide area-grid"><div><div className="eyebrow eyebrow-light">SERVICE COVERAGE</div><h2 id="area-title" className="serif">Pool Services<br /><em>Across Cyprus</em></h2><p>Send your property location to confirm whether the service is available in your area.</p><button className="button button-orange" type="button" onClick={scrollToQuote} data-testid="button-area-quote">Confirm Your Area <ArrowRight size={17} /></button></div><div className="map-placeholder" aria-label="Replaceable map or service-area placeholder"><span className="map-grid" /><span className="map-island">CYPRUS</span><div className="map-labels"><span>Cyprus</span><span>Main service areas: [VERIFY]</span><span>Nearby areas: [VERIFY]</span></div></div></div></section>

      <section className="section-pad faq-section" id="faqs" aria-labelledby="faq-title"><div className="container-wide faq-grid"><div><div className="eyebrow">QUESTIONS, CLEARLY ANSWERED</div><h2 id="faq-title" className="serif">Pool Project<br /><em>FAQs</em></h2><p>Still deciding what to ask? Share the property location and a short description through the form.</p><button className="text-link" type="button" onClick={scrollToQuote} data-testid="button-faq-quote">Ask about your pool <ArrowRight size={15} /></button></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? 'is-open' : ''}`} key={question}><button type="button" className="faq-question" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} data-testid={`button-faq-${index}`}><span>{question}</span>{openFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button>{openFaq === index && <p className="faq-answer">{answer}</p>}</div>)}</div></div></section>

      <section className="final-cta" id="contact" aria-labelledby="final-title"><div className="container-wide final-cta-inner"><div><div className="eyebrow eyebrow-light">READY WHEN YOU ARE</div><h2 id="final-title" className="serif">Planning a Pool Project<br /><em>or Need Pool Support?</em></h2><p>Send your property location and a short description of your construction, renovation, maintenance, or repair requirements.</p></div><div className="final-actions"><button type="button" className="button button-orange" onClick={scrollToQuote} data-testid="button-final-quote">Request a Quote <ArrowRight size={17} /></button><a href="tel:+35770088701" className="button button-light" data-testid="link-final-call"><Phone size={16} /> Call Aquart Pools</a><PendingWhatsApp /></div></div></section>

      <footer className="site-footer" id="footer"><div className="container-wide footer-grid"><div><Logo /><p>Pool construction<br />Pool renovation<br />Pool maintenance<br />Pool repairs<br />Equipment and upgrades</p></div><div><div className="footer-label">CONTACT</div><a href="tel:+35770088701" data-testid="link-footer-phone">+357 70 088701</a><a href="mailto:aquartpools@gmail.com" data-testid="link-footer-email">aquartpools@gmail.com</a></div><div><div className="footer-label">DETAILS TO VERIFY</div><span>Service area: [VERIFY]</span><span>Address: [VERIFY BEFORE PUBLISHING]</span><span>Opening hours: [VERIFY BEFORE PUBLISHING]</span></div><div><div className="footer-label">LEGAL</div><a href="#footer" data-testid="link-footer-privacy">Privacy Policy placeholder</a><a href="#footer" data-testid="link-footer-terms">Terms placeholder</a><PendingWhatsApp compact /></div></div><div className="container-wide footer-bottom"><span>Demo template — verify all business information, services, project images, contact details, opening hours, legal pages, and claims before publishing.</span><span className="mono">AQUART POOLS / CYPRUS</span></div></footer>

      <div className="mobile-contact-bar" aria-label="Quick contact"><a href="tel:+35770088701" data-testid="link-mobile-call"><Phone size={17} /><span>Call</span></a><PendingWhatsApp compact /><button type="button" onClick={scrollToQuote} data-testid="button-mobile-quote"><FileText size={17} /><span>Request Quote</span></button></div>
    </main>
  );
}

function Field({ label, required, optional, error, children }: { label: string; required?: boolean; optional?: boolean; error?: string; children: ReactNode }) {
  return <div className="field"><label htmlFor={(children as ReactElement<{ id?: string }>).props.id}>{label} {required && <span className="required">*</span>}{optional && <small>Optional</small>}</label>{children}{error && <p className="field-error" role="alert">{error}</p>}</div>;
}

export default App;