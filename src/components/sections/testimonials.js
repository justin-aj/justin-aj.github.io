import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledTestimonialsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledTestimonial = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .role-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }
    }
    .image-wrapper {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .role-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  .image-wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }

    a {
      width: 100%;
      height: 100%;
      background-color: var(--green);
      border-radius: var(--border-radius);
      vertical-align: middle;

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before,
        .img {
          background: transparent;
          filter: none;
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        background-color: var(--navy);
        mix-blend-mode: screen;
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(50%);
      }
    }
  }
`;

const Testimonials = () => {
  const revealTitle = useRef(null);
  const revealTestimonials = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealTestimonials.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const testimonials = [
    {
      name: 'Ekaagar Singh Hara',
      role: 'Data Scientist at AARP',
      company: 'AARP',
      content:
        'I had the pleasure of working with Ajin during his internship at AARP, and he quickly distinguished himself as someone who learns fast, thinks critically, and delivers reliably. He took ownership of a technically demanding analytics project. He approached it with maturity well beyond an intern level—breaking down ambiguous problems, validating results carefully, and communicating his progress with clarity and professionalism.',
      link: 'https://www.linkedin.com/in/ekaagar/',
    },
    {
      name: 'Sharon Xu',
      role: 'Senior Director of Data Science at AARP',
      company: 'AARP',
      content:
        'Ajin quickly learned the business and built a Databricks-based model tracking system to monitor campaign ML model accuracy month by month, with an automated pipeline and clear visualizations. He proactively partnered with stakeholders to expand the scope and move this work into production, significantly reducing manual effort. Ajin is hardworking, flexible, and thoughtful in his approach.',
      link: 'https://www.linkedin.com/in/sharonxu123456/',
    },
    {
      name: 'Taylor Sorgini',
      role: 'Team Leader Digitalization at Dynapac',
      company: 'Dynapac',
      content:
        'Ajin consistently demonstrated a strong work ethic, an unrelenting curiosity for learning, and a desire to tackle complex problems with innovative solutions. Almost immediately after joining the team, it was evident that Ajin possessed a natural talent for software development as well as strong communication skills. His proficiency in Python quickly became an asset to our projects.',
      link: 'https://www.linkedin.com/in/taylor-sorgini-531274144/',
    },
    {
      name: 'Petr Hutar',
      role: 'System Engineer at Dynapac',
      company: 'Dynapac',
      content:
        'I have had the pleasure to have Ajin on my team... I have seen an outstanding performance from a technical point of view, but from my perspective even more importantly a commitment to independently find, understand and deliver a solution.',
      link: 'https://www.linkedin.com/in/petr-hutar-20812649/',
    },
  ];

  return (
    <section id="testimonials">
      <h2 className="numbered-heading" ref={revealTitle}>
        Recommendations
      </h2>

      <StyledTestimonialsGrid>
        {testimonials.map((testimonial, i) => {
          const { name, role, content, link, company } = testimonial;

          return (
            <StyledTestimonial key={i} ref={el => (revealTestimonials.current[i] = el)}>
              <div className="content">
                <div>
                  <p className="overline">Recommendation</p>

                  <h3 className="title">
                    <a href={link} target="_blank" rel="noreferrer">
                      {name}
                    </a>
                  </h3>

                  <div className="description">
                    <p>{content}</p>
                  </div>

                  <ul className="role-list">
                    <li>{role}</li>
                  </ul>

                  <div className="links">
                    <a href={link} aria-label="LinkedIn" target="_blank" rel="noreferrer">
                      <Icon name="Linkedin" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="image-wrapper">
                <a href={link} target="_blank" rel="noreferrer">
                  {company === 'AARP' && (
                    <StaticImage
                      src="../../images/aarp.png"
                      width={700}
                      quality={95}
                      formats={['AUTO', 'WEBP', 'AVIF']}
                      alt="AARP Logo"
                      className="img"
                    />
                  )}
                  {company === 'Dynapac' && (
                    <StaticImage
                      src="../../images/dynapac.png"
                      width={700}
                      quality={95}
                      formats={['AUTO', 'WEBP', 'AVIF']}
                      alt="Dynapac Logo"
                      className="img"
                    />
                  )}
                </a>
              </div>
            </StyledTestimonial>
          );
        })}
      </StyledTestimonialsGrid>

      <p style={{ textAlign: 'center', marginTop: '50px', color: 'var(--light-slate)' }}>
        View all recommendations on{' '}
        <a
          href="https://www.linkedin.com/in/ajin-frank-j/details/recommendations/"
          target="_blank"
          rel="noreferrer">
          LinkedIn
        </a>
        .<br />
        <span style={{ fontSize: 'var(--fz-sm)', marginTop: '10px', display: 'block' }}>
          (Note: If you are logged into LinkedIn, this opens my recommendations directly. Otherwise,
          you may see a login page.)
        </span>
      </p>
    </section>
  );
};

export default Testimonials;
