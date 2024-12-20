"""first

Revision ID: 3279f3e0f96b
Revises: 
Create Date: 2024-10-29 17:38:41.583185

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3279f3e0f96b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('projects', schema=None) as batch_op:
        batch_op.add_column(sa.Column('airfoilData', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('projects', schema=None) as batch_op:
        batch_op.drop_column('airfoilData')

    # ### end Alembic commands ###
