import SectionHeader from '../components/SectionHeader.jsx';
import { clientReviews } from '../constants/index.js';

const Testimonials = () => {
    return (
        <section className="section-wrap" id="recommendations">
            <div className="shell">
                <SectionHeader
                    eyebrow="Recommendations"
                    title="Trusted by mentors, engineering leaders, and collaborators."
                    description="These recommendations reflect how I show up in real environments: accountable, technically curious, and focused on dependable execution."
                />

                <div className="recommendations-grid">
                    {clientReviews.map((review) => (
                        <article key={review.id} className="premium-card recommendation-card">
                            <p className="recommendation-quote">{review.review}</p>

                            <div className="recommendation-footer">
                                <img
                                    src={review.img}
                                    alt={review.name}
                                    className="recommendation-avatar"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div>
                                    <strong>{review.name}</strong>
                                    <p>{review.position}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
