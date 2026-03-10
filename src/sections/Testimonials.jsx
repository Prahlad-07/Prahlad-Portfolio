import { clientReviews } from "../constants/index.js";

const Testimonials = () => {
    return (
        <section className="c-space my-24 section-wrap" id="testimonials">
            <h3 className="head-text">Recommendations</h3>
            <p className="text-white-500 mt-3 max-w-3xl">
                Feedback from mentors and senior professionals I have worked with across engineering,
                problem-setting, and production delivery.
            </p>

            <div className="client-container">
                {clientReviews.map((item) => (
                    <article key={`review-${item.id}`} className="client-review">
                        <p className="client-review_text">{item.review}</p>

                        <div className="client-content">
                            <div className="flex gap-3 items-center">
                                <img src={item.img} alt={item.name} className="client-avatar" loading="lazy" decoding="async" />
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold text-white-800 leading-tight">{item.name}</p>
                                    <p className="client-role">{item.position}</p>
                                </div>
                            </div>

                            <div className="flex self-end items-center gap-2" aria-label="5 star rating">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <img key={index} src="/assets/star.png" alt="star" className="w-4 h-4" loading="lazy" decoding="async" />
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
