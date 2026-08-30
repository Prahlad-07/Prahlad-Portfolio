import { clientReviews } from '../../constants/index.js';

const RecommendationsPreview = () => (
    <div className="pv pv-recs" data-stagger>
        <p className="pv_run">$ cat recommendations.md</p>

        <div className="rec_grid" data-stagger>
            {clientReviews.map((r) => (
                <figure className="rec" key={r.id}>
                    <blockquote className="rec_quote">{r.review}</blockquote>
                    <figcaption className="rec_by">
                        <img src={r.img} alt={r.name} loading="lazy" />
                        <span>
                            <b>{r.name}</b>
                            <span>{r.position}</span>
                        </span>
                    </figcaption>
                </figure>
            ))}
        </div>
    </div>
);

export default RecommendationsPreview;
