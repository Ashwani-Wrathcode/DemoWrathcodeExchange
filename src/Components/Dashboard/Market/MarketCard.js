import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./Market.css";

function MarketCard({ marketUpdate }) {
    return (
        <div className="cards-grid">
            {marketUpdate.map((item) => {
                const isNegative = item.change_percentage < 0;

                return (
                    <div className="market-card" key={item._id}>
                        <div className="card-header">
                            <h4>{item.base_currency}</h4>
                            <MdKeyboardArrowRight className="card-arrow" />
                        </div>

                        <h3>
                            <span className={isNegative ? "red-text" : "green-text"}>
                                {item.buy_price}
                            </span>

                            <span className="divider"> | </span>

                            <span className={isNegative ? "red-text" : "green-text"}>
                                {item.change_percentage}%
                            </span>
                        </h3>

                        <div className="card-bottom">
                            <span>
                                {item.base_currency}/{item.quote_currency}
                            </span>

                            <button className="trade-pill-btn">
                                Make Trade
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default MarketCard;